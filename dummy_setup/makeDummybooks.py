from genericpath import isdir
from random import randint
import os, sys
from faker import Faker # random data
from tqdm import tqdm
from PIL import Image, ImageDraw


faker = Faker()
bookFolder = os.path.join(".","books") # make sure to run at home.. (not gonna go through the trouble..)
if not(os.path.isdir(bookFolder)):
    os.mkdir(bookFolder)
    
def randomColor():
    return tuple([randint(0,255) for _ in range(3)])

def main(numBooks): # will add a random id book in the books folder
    for _ in range(numBooks):
        newBookId = randint(1000000,9999999)
        newFolder = os.path.join(bookFolder, str(newBookId))
        if (os.path.isdir(newFolder)):
            print("Folder exist, unlucky")
            continue

        os.mkdir(newFolder) # not yet for storing book info in db
        # 5-20 chapters
        img = Image.new("RGB", (1024,2048), randomColor())
        ImageDraw.Draw(img).text((300,300), f"BOOK ID {newBookId}", fille = (0,0,0))
        img.save(os.path.join(newFolder, "cover.png"))
        
        for i, _ in tqdm(enumerate(range(randint(5 , 20)), start=1)):
            volName = os.path.join(newFolder, f"{i}-{faker.text().split(' ')[0]}") # huh...
            os.mkdir(volName)
            for j, _ in enumerate(range(randint(5 , 10)), start = 1):
                arcName = os.path.join(volName, f"{j}-{'_'.join(faker.text().split(' ')[0:3]).replace('.','')}.txt") # ehh.
                with open(arcName, "a+") as arc:
                    for _ in range(randint(100 , 1000)): # lines
                        arc.write(faker.text())


if __name__ == "__main__":
    main(int(sys.argv[1]))