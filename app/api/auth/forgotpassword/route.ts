import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma"; 
import bcrypt from "bcrypt"; 
import { randomBytes } from "crypto"; 
import { sendResetEmail } from "@/lib/email";





async function createPasswordResetToken(userId: string) {
  const token = randomBytes(32).toString("hex"); 
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000); 

  const resetToken = await prisma.passwordResetToken.create({
    data: {
      token,
      userId,
      expiresAt,
    },
  });

  return resetToken.token; 
}

// Verify the reset token
async function verifyResetToken(token: string) {
  const resetToken = await prisma.passwordResetToken.findUnique({
    where: { token },
  });

  if (!resetToken) {
    throw new Error("Invalid or expired token");
  }

  if (resetToken.expiresAt < new Date()) {
    throw new Error("Token has expired");
  }

  if (resetToken.usedAt) {
    throw new Error("Token has already been used");
  }

  return resetToken;
}

// Mark the reset token as used once the password is changed
async function markTokenAsUsed(token: string) {
  await prisma.passwordResetToken.update({
    where: { token },
    data: {
      usedAt: new Date(), // Mark the token as used
    },
  });
}

// Handle password reset
async function resetPassword(token: string, newPassword: string) {
  // Verify the token
  const resetToken = await verifyResetToken(token);

  // Hash the new password
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  // Update the user's password
  await prisma.user.update({
    where: { id: resetToken.userId },
    data: { password: hashedPassword },
  });

  // Mark the token as used
  await markTokenAsUsed(token);
}

// Forgot password handler
export async function POST(req: NextRequest) {
  const { email, token, newPassword } = await req.json(); 

  // If it's a forgot password request
  if (email) {
    if (!email) {
      return NextResponse.json({ message: "Email is required" }, { status: 400 });
    }

    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        return NextResponse.json({ message: "User not found" }, { status: 404 });
      }

      // Create the reset token
      const resetToken = await createPasswordResetToken(user.id);

      // Generate the reset password link
      const resetLink = `${process.env.NEXTAUTH_URL}/auth/reset-password?token=${resetToken}`;
;

      // Send the reset email
      await sendResetEmail(email, resetLink);

      return NextResponse.json({ message: "Password reset email sent" }, { status: 200 });
    } catch (error) {
      console.error("Error in forgot password:", error);
      return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
  }

  // If it's a reset password request
  if (token && newPassword) {
    if (!token || !newPassword) {
      return NextResponse.json({ message: "Token and new password are required" }, { status: 400 });
    }

    try {
      // Reset the password
      await resetPassword(token, newPassword);

      return NextResponse.json({ message: "Password reset successfully" }, { status: 200 });
    } catch (error) {
      console.error("Error in resetting password:", error);
      const errorMessage = error instanceof Error ? error.message : "Internal server error";
      return NextResponse.json({ message: errorMessage }, { status: 500 });
    }
  }

  return NextResponse.json({ message: "Invalid request" }, { status: 400 });
}
