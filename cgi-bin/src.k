#!/usr/local/bin/konoha

OUT << "Content-Type: text/plain" << EOL << EOL;

String query = $env.QUERY_STRING;
//------ Run Src ---------
String decodeToKonoha(String query) {
	String[] map = query.split("&");
	String str = map[1];
	str = str.replace("%22", "\"");
	str = str.replace("%20", " ");
	str = str.replace("%3C", "<");
	str = str.replace("%3E", ">");
	return str;
}

void outputResult(String kScript) {
//	String result = eval(kScript);
	String result = kScript;
	OUT << result << EOL;
}
//Bytes b = new byte[$env.CONTENT_LENGTH];
//IN.read(b, 0, |b|);
//print b.decode();
print IN.readLine();
print IN.readLine();
print IN.readLine();
print IN.readLine();
while (script != null) {
	print i++;
	OUT << script << EOL;
	script = IN.readLine();
}
print i;
//outputResult(decodeToKonoha(query));

//------ Save Src ------------

//------ Load Src ------------

//------ Fork Src From Friend -------

//------ Other Work About Src... -----
