#include <SoftwareSerial.h>

int bluetoothTx = 0;  // TX-O pin of bluetooth mate, Arduino D2
int bluetoothRx = 1;  // RX-I pin of bluetooth mate, Arduino D3

SoftwareSerial bluetooth(bluetoothTx, bluetoothRx);

const int trig = 9;
const int echo = 10;
const float speedOfSound = 0.0343; // cm/ms

int startingDist;
int distance;
bool sendSig = true;

void setup() {
  // put your setup code here, to run once:
  pinMode(trig,OUTPUT);
  pinMode(echo,INPUT);
  Serial.begin(9600);
  
  digitalWrite(trig,LOW);
  delayMicroseconds(5);
  digitalWrite(trig,HIGH);
  delayMicroseconds(10);
  digitalWrite(trig,LOW);

  startingDist = (speedOfSound/2)*pulseIn(echo, HIGH);
}

void loop() {
  // put your main code here, to run repeatedly:
  digitalWrite(trig,LOW);
  delayMicroseconds(5);
  digitalWrite(trig,HIGH);
  delayMicroseconds(10);
  digitalWrite(trig,LOW);

  distance = (speedOfSound/2)*pulseIn(echo, HIGH);
  
  if(distance >= startingDist + 3){
    //Serial.print(distance);
    //Serial.println("cm");
    //Serial.println("");
    Serial.println("Open");
    sendSig = true;
    delay(1000);
  }
  else{
    if (sendSig) {
      // do stuff
      Serial.println("sending signal");
    }
    Serial.println("closed");
    sendSig = false;
    delay(1000);
  }
  
  
  

}
