
# this will create some CSV files and needs to run externally to fill db

from faker import Faker # random data
import random
import os, sys
from glob import glob
from tqdm import tqdm
import bcrypt
import datetime
import csv


faker = Faker()
bookFolder = os.path.join(".","books") # make sure to run at home.. (not gonna go through the trouble..)
dummyDataStorage = os.path.join(".", "dummy_setup", "generatedData")
assert os.path.isdir(bookFolder) ,"There are no books in the books folder, please run 'makeDummybooks.py' for testing"

if (not(os.path.isdir(dummyDataStorage))):
    os.mkdir(dummyDataStorage)



GENRES = ['drama', 'fable', 'fairy tale', 
          'fantasy', 'fiction', 'fictionin verse', 
          'folklore', 'historical fiction', 'horror',
          'humor', 'legend', 'mystery', 'mythology', 
          'poetry', 'realistic fiction', 'science fiction', 
          'short story', 'tallTale', 'biography', 'essay', 
          'narrative nonfiction', 'nonfiction', 'speech']

def generes(bookid) -> list:
    # returns [[bookid, genreN], [bookid, genreN], ..] -> max 5
    gens = random.sample( GENRES ,random.randint(1,5) )
    return [[bookid, gen] for gen in gens]
    
def users(n) -> list: # I want the actual password
    # returns [[uid, uname, cryptPass], ..], [[uid, uname, pass],...]
    hashs = []
    reals = []
    for _ in range(n):
        uid = random.randint(100000000,999999999)
        uname = faker.user_name()
        upass = faker.password()
        cryptpass = bcrypt.hashpw(upass.encode(), bcrypt.gensalt() ).decode()
        
        hashs.append([uid, uname, cryptpass])
        reals.append([uid, uname, upass])
        
    return hashs, reals

def bookDetails(bookid):
    bookname = " ".join(faker.words())
    author = random.choice([faker.name_female(), faker.name_male()])
    # https://omniglot.com/language/names.htm
    rating = round(random.random() * 5, 2)
    views = random.randint(10,500)
    bookLang = random.choice(["𖫢𖫧𖫳𖫒𖫨𖫰𖫨𖫱","भीली", "English", "中文", "日本語", "कोँइच", "تالشی زَوُن"])
    bookUpload = str(datetime.datetime.now()  - datetime.timedelta(seconds= random.randint(500, 10000)))
    isPrivate = random.choice(["yes", "no"])
    
    return [bookname, bookid ,author, rating, views, bookLang, bookUpload, isPrivate]

def book2user(bookids, userids): # currently 1 to 1 relationship
    bk2user = []
    for bid in bookids:
        bk2user.append([bid, random.choice(userids)])
    return bk2user
        
def writeCSV(fname, headers, rows):
    with open(fname, "w+") as csvf:
        csvwriter = csv.writer(csvf)
        csvwriter.writerow(headers)
        csvwriter.writerows(rows)

if __name__ == "__main__":
    import sys
    numUsers = sys.argv[1]
    assert numUsers.isdigit(), "integer please"
    
    numUsers = int(numUsers) # please don't break this on intention
    
    
    allBookids = [os.path.basename(path) for path in glob(os.path.join(bookFolder, "*"))]

    bookTable = [bookDetails(bid) for bid in allBookids]
    
    bookGens = [ idGen for bid in allBookids for idGen in generes(bid)]
    
    
    usersHash, userReal = users(numUsers)
    
    
    userIds = [uid for uid, _,_ in usersHash]
    
    bookUserRelation = book2user(allBookids, userIds)
    
    writeCSV(os.path.join(dummyDataStorage, "book.csv"),
             ["bookname", "bookid", "author", "rating", "views", "book_language", "book_upload","is_private"],
             bookTable)
    
    writeCSV(os.path.join(dummyDataStorage, "genres.csv"),
             ["bookid","genre"],
             bookGens)
    
    writeCSV(os.path.join(dummyDataStorage, "users.csv"),
             ["userid", "username","hashpass"],
             usersHash)

    writeCSV(os.path.join(dummyDataStorage, "usersReal.csv"), # this file will not be stored
             ["userid", "username","password"],
             userReal)
    
    writeCSV(os.path.join(dummyDataStorage, "ownby.csv"),
             ["bookid","userid"],
             bookUserRelation)
    
    
"""
create table book(
    bookname varchar(512) not null,
    bookid serial primary key,
    author varchar(512),
    rating float default 0,
    views integer default 0,
    book_language varchar(128),
    book_upload date,
    is_private boolean
);

create table book_genre(
    bookid integer,
    genre varchar(128),
    primary key(bookid, genre),
    foreign key (bookid) references book(bookid) on delete cascade
);

create table users(
    userid varchar(512) primary key,
    username varchar(256) unique,
    hashpass varchar(512)
);

create table ownby(
    bookid integer,
    userid varchar(512),
    primary key (bookid),
    foreign key (bookid) references book(bookid) on delete cascade,
    foreign key (userid) references users(userid) 
);
"""

