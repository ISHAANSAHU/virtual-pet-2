
var dog;
var happyDog;
var database;
var databaseRef;
var foodInDB
var foodStockRef;
var foodObj;
function preload()
{
  //load images here
  dogImg = loadImage("images/dogImg.png")
  happyDogImg = loadImage("images/dogImg1.png")
}

function setup() {
  createCanvas(1000, 500);
  database=firebase.database()
  foodObj=new Food();
  foodObj.getFoodStock();
  dog =createSprite(750,250,10,10);
  dog.addImage(dogImg);
  dog.scale=0.5;
  foodStockRef=database.ref('food')
  foodStockRef.on("value",readStock)
}
  
function draw() { 
  background(46,139,87);
  foodObj.display();
  if(keyWentDown(UP_ARROW)){
    writeStock(foodInDB);
    dog.addImage(happyDogImg)
 }
 else{
   dog.addImage(dogImg);
 }
textSize(20);
  fill("white")
 text("press up arrow to feed the dog",100,70);

  drawSprites();
  //add styles here

}
function writeStock(x){
  if(x<=0){
    x=0
  }
  else{
    x=x-1;

  }
  database.ref('/').update({
    food:x
  })
    
  
}

function readStock(data){
  foodInDB= data.val();
  console.log(foodInDB);
}
