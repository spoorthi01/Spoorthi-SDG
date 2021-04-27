var ground, groundImg, invisibleGround, invisibleGround1,  girl, girlAnim, girlStanding;
var dog1, dog1Img, dog2, dog2Img;
var tree, treeImg1, treeImg2, cloudImg, mailboxImg;
var treeGroup, cloudGroup, mailboxGroup;
var flag = true;
var flag2 = true;
var scoreFlag = false;
var levelFlag = false;
var life = 3;
var gameState = 1;
var score = 0;
var plant1Img, plant2Img, plant3Img;
var plantGroup;
var collideSound, dogdBarkSound, levelUpSound, loseLifeSound;

function preload(){
  girlAnim = loadAnimation("Images/G1.png","Images/G2.png","Images/G3.png","Images/G4.png","Images/G5.png","Images/G6.png","Images/G7.png");

  groundImg = loadImage("Images/ground 2.png");

  dog1Img = loadAnimation("Images/P1.png","Images/P2.png","Images/P3.png","Images/P4.png","Images/P5.png","Images/P6.png","Images/P7.png","Images/P8.png","Images/P9.png","Images/P10.png");

  dog2Img = loadAnimation("Images/2P1.png","Images/2P2.png","Images/2P3.png","Images/2P4.png","Images/2P5.png","Images/2P6.png","Images/2P7.png","Images/2P8.png","Images/2P9.png","Images/2P10.png");

  treeImg1 = loadImage("images/T1.png");

  treeImg2 = loadImage("images/T8.png");

  cloudImg = loadImage("images/Cloud1.png");

  mailboxImg = loadImage("images/Mail Box.png");
  
  girlStanding = loadAnimation("Images/G6.png");

  plant1Img = loadImage("Images/Plant1.png");

  plant2Img = loadImage("Images/Plant2.png");

  plant3Img = loadImage("Images/Plant3.png");

  collideSound = loadAudio()

}

function setup() {
  createCanvas(displayWidth-20,displayHeight-110);
  
  ground = createSprite(width/2, height+280, width, 10);
  ground.addImage("ground",groundImg);
  ground.scale = 2.0;
  ground.x = ground.width/2 - 700;
  ground.velocityX = 6;
  ground.debug = true;

  invisibleGround = createSprite(width/2, height-5 , width, 5);
  invisibleGround.visible = false;

  invisibleGround1 = createSprite(width/2, height-10 , width, 5);
  invisibleGround1.visible = false;
  
  girl = createSprite(width-100, height-30, 30, 30);
  girl.addAnimation("girl",girlAnim);
  girl.addAnimation("stand", girlStanding)
  girl.scale = 2.5;
  girl.setCollider("rectangle",0,0,30,100);

  dog1 = createSprite(width/2, height-30, 30, 30);
  dog1.addAnimation("dogImg", dog1Img);
  dog1.scale = 1.5;

  dog2 = createSprite(width/2 - 160, height-30, 30, 30);
  dog2.addAnimation("dog2Img", dog2Img);
  dog2.scale = 1.5;

  treeGroup = new Group();

  cloudGroup = new Group();

  mailboxGroup = new Group();

  plantGroup = new Group();
}

function draw() {
  background("#B6D3EF");  

  if(gameState === 1){

    score=score+Math.round(getFrameRate()/60);

    ground.velocityX = 6;

    if(ground.x > width){
      ground.x = ground.width/2 - 700;
    }

    if(keyDown(UP_ARROW) && girl.y >= 375.5){
      girl.velocityY = -14;
      girl.velocityX = -3;
    }


    if(girl.y >= 375.5){
      girl.velocityX = 0;
      girl.x = width-100;
    }

    girl.velocityY = girl.velocityY+0.5;

    spawnTrees();
    spawnObstacles();

    if(mailboxGroup.isTouching(girl) && flag){
      life = life-1;
      flag = false;
      if(life === 0){
        gameState = 0;
      }


      setTimeout(function() {
        flag = true;
      }, 2000);
      
    }

    if(score>500 && plantGroup.isTouching(girl) && flag2){
      life = life-1;
      flag2 = false;
      if(life === 0 ){
        gameState = 0;
      }

      setTimeout(function() {
        flag2 = true;
      }, 2000);
    }
  
  }else if (gameState === 0){

    console.log("hello");
   
    ground.velocityX = 0;
    girl.velocityY = 0;
    girl.velocityX = 0;

    mailboxGroup.setVelocityXEach(0);
    treeGroup.setVelocityXEach(0);
    cloudGroup.setVelocityXEach(0);
    plantGroup.setVelocityXEach(0);

    dog1.velocityX = -4;
    dog2.velocityX = -4;

    girl.changeAnimation("stand", girlStanding);

    mailboxGroup.setLifetimeEach(-1);
    plantGroup.setLifetimeEach(-1);

    if(keyDown("R")){
      reset();
    }

  } else if(gameState === 2){
    score=score+Math.round(getFrameRate()/60);

    ground.velocityX = 6;

    if(ground.x > width){
      ground.x = ground.width/2 - 700;
    }

    if(keyDown(UP_ARROW) && girl.y >= 375.5){
      girl.velocityY = -14;
      girl.velocityX = -3;
    }


    if(girl.y >= 375.5){
      girl.velocityX = 0;
      girl.x = width-100;
    }

    girl.velocityY = girl.velocityY+0.5;

    spawnTrees();
    spawnObstacles();
    spawnPlants();

    if(mailboxGroup.isTouching(girl) && flag){
      life = life-1;
      flag = false;
      if(life === 0){
        gameState = 0;
      }


      setTimeout(function() {
        flag = true;
      }, 2000);
      
    }

    if(score>500 && plantGroup.isTouching(girl) && flag2){
      life = life-1;
      flag2 = false;
      if(life === 0 ){
        gameState = 0;
      }

      setTimeout(function() {
        flag2 = true;
      }, 2000);
    }
    // if(score > 500 && !scoreFlag){
    //   alert("You entered level 2")
    //   scoreFlag = true; 
    //   gameState = 1;

    //   dog1.x = dog1.x+100;
    //   dog2.x = dog2.x+100;
    
    // }

    // if(score > 1500 && !levelFlag){
    //   alert("you entered level 3")
    //   levelFlag = true;
    //   gameState = 1;

    //   dog1.x = dog1.x+50;
    //   dog2.x = dog2.x+50;

    //   console.log(plantGroup);
    //   console.log(dog1.x);
    //}
  }

  if(score > 500 ){
      gameState = 2;
      console.log("11111111111111111111111111111111111111111111111");
      console.log(gameState);
      if(!scoreFlag){
        alert("You enetered Level 2");
        scoreFlag = true;
      }
    }else if(score > 1500){
        gameState = 3;
    }


  girl.collide(invisibleGround);
  dog1.collide(invisibleGround);
  dog2.collide(invisibleGround);

  drawSprites();

  textSize(20);
  textFont("Georgia");
  text("Score: "+score,50,70);

  text("Lives: "+life,width-100,70);

  if(gameState === 0){
    textSize(30);
    text("Oh No! You lost the dogs!!", width/2-140,70); 
    textSize(20);
    text("Press 'R' to to try again",width/2-100,120);
  }

  console.log(gameState);
}

function spawnTrees(){
  if(frameCount % 350 === 0){
    tree = createSprite(-10,height-110,10,10);
    
    var rand = Math.round(random(1,2));

    if(rand === 1){
      tree.addImage("tree1", treeImg1);
    }else{
      tree.addImage("tree2", treeImg2);
    }

    tree.scale = 1.2;

    tree.velocityX = 6; 

    tree.lifetime = width/5; 

    treeGroup.add(tree);

    girl.depth = tree.depth;
    girl.depth = girl.depth+1;

    dog1.depth = tree.depth;
    dog1.depth = dog1.depth+1;

    dog2.depth = tree.depth;
    dog2.depth = dog2.depth+1;

  }

  if(frameCount % 250 === 0){
    var cloud = createSprite(-10,height-300,10,10)
    cloud.addImage("cloud", cloudImg);

    cloud.velocityX = 3; 

    cloud.lifetime = width/3;

    cloudGroup.add(cloud);
  }
}

function spawnObstacles(){
  var mailbox;
  if(frameCount % 200 === 0){
    mailbox = createSprite(0,height-40,10,10);
    mailbox.addImage("mailbox", mailboxImg);
    
    mailbox.scale = 0.3;

    mailbox.velocityX = 6;
  
    mailbox.lifetime = 500;
  
    mailboxGroup.add(mailbox);

    girl.depth = mailbox.depth;
    girl.depth = girl.depth+1;

    dog1.depth = mailbox.depth;
    dog1.depth = dog1.depth+1;

    dog2.depth = mailbox.depth;
    dog2.depth = dog2.depth+1;

    if(mailbox.x > width){
      score = score+100;
    }

    if(tree != undefined){
      mailbox.depth = tree.depth;
      mailbox.depth = mailbox.depth+1;
    }
  }
  if(mailbox != undefined){
    mailbox.x = mailbox.x+5;
  } 
}

function reset(){
  gameState = 1;
  score = 0;
  life = 3; 
  dog1.velocityX = 0;
  dog2.velocityX = 0;
  dog1.x = width/2;
  dog1.y = height-30;
  dog2.x = width/2-160;
  dog2.y = height-30;
  mailboxGroup.destroyEach();
  cloudGroup.destroyEach();
  treeGroup.destroyEach();
  plantGroup.destroyEach();
  girl.changeAnimation("girl",girlAnim);
  scoreFlag = false;
  flag2 = true;
  flag = true;
}

function spawnPlants(){
  if(frameCount % 250 === 0){
    var plant = createSprite(0,height-30,10,10);
    
    var rand = Math.round(Math.random(1,3));
    if(rand === 1){
      plant.addImage("plant1", plant1Img);
    }
    else if (rand === 2){
      plant.addImage("plant2", plant2Img);
    }
    else {
      plant.addImage("plant3", plant3Img);
    }

    plant.scale = 0.2;

    plant.velocityX = 6;

    plant.lifetime = 500;

    plantGroup.add(plant);

    girl.depth = plant.depth;
    girl.depth = girl.depth+1;

    dog1.depth = plant.depth;
    dog1.depth = dog1.depth+1;

    dog2.depth = plant.depth;
    dog2.depth = dog2.depth+1;

    plant.depth = tree.depth;
    plant.depth = plant.depth+1;

  }
}