import 'package:flutter/material.dart';
import 'package:flutter_application/SplashSrceen.dart'; 
void main() { 
  runApp(MyApp()); 
} 
  
class MyApp extends StatelessWidget { 
  @override 
  Widget build(BuildContext context) { 
    return MaterialApp( 
      title: 'Splash Screen', 
      theme: ThemeData( 
        primarySwatch: Colors.green, 
      ), 
      home: SplashScreen(), 
      debugShowCheckedModeBanner: false, 
    ); 
  } 
} 