#!/usr/local/bin/konoha

OUT << "Content-Type: text/plain" << EOL << EOL;

String query = $env.QUERY_STRING;
String[] args = query.split("&");
/*
TODO
 confirm user data by konoha.sql
*/

