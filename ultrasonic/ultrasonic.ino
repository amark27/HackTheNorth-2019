const int trig = 9;
const int echo = 10;
const float speedOfSound = 0.0343; // cm/ms

int distance;

void setup() {
  // put your setup code here, to run once:
  pinMode(trig,OUTPUT);
  pinMode(echo,INPUT);
  Serial.begin(9600);
}

void loop() {
  // put your main code here, to run repeatedly:
  digitalWrite(trig,LOW);
  delayMicroseconds(5);
  digitalWrite(trig,HIGH);
  delayMicroseconds(20);
  digitalWrite(trig,LOW);

  distance = (speedOfSound/2)*pulseIn(echo, HIGH);

  Serial.print(distance);
  Serial.println("cm");
  Serial.println("");
  delay(1000);
  
  

}
