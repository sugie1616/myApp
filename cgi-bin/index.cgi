#!/usr/local/bin/konoha

OUT << "Content-Type: text/plain" << EOL << EOL;


/* GET */

String query = $env.QUERY_STRING;
String[] args = query.split("&");
OUT << args << EOL;
OUT << exec("env") << EOL;
OutputStream out = new OutputStream("sss");
out <<< query;
out.flush();

/* POST */

//int length = (to int)$env.CONTENT_LENGTH;
//Bytes b = new byte[length];

// IN.read(b, 0, length); // not exist
// InputStream input = (to InputStream)b;
// input.readLine();

s = IN.readLine()
while (s != null) {
	...
	s = IN.readLine();
}
