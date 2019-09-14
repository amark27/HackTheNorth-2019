import processing.serial.*;

Serial mySerial;
PrintWriter output;
int count;

void setup() {
  mySerial = new Serial( this, Serial.list()[1], 9600 );
  count = 0;
}

void draw() {
  if (mySerial.available() > 0 ) {
    String value = mySerial.readString();
    if ( value != null ) {
      output = createWriter( "tmp/data.txt" );
      output.println(++count);
      output.flush();
      output.close();
    }
  }
}
