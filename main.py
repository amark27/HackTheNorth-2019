from time import sleep
from subprocess import Popen

if __name__ == "__main__":
    count = 0
    while True:
        with open("C:/Users/James Jiang/Documents/HTN2019/client/tmp/data.txt", "r") as f:
            new_count = int(f.readlines()[0])
        
        if new_count > count:
            count = new_count
            p = Popen("C:/Users/James Jiang/Documents/HTN2019/get_objects.bat")
            stdout, stderr = p.communicate()
            
        sleep(1)
