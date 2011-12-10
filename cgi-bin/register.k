#!/usr/local/bin/konoha

//using konoha.sql.*;
OUT << "Content-Type: text/plain" << EOL << EOL;

String query = $env.QUERY_STRING;
String[] args = query.split("&");
/*
 register user data
*/
//OutputStream out = new OutputStream("sss");
//out <<< args;
//out.flush();
