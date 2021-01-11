//changes for each ML anaysis and results

function combbrfc(){ 
  document.getElementById('myImage') 
  .src="static/images/Comb_Results.png"; 
  document.getElementById('title') 
  .innerHTML="Results-Combination: Balanced Random Forest Classifier"; 
  document.getElementById('description') 
  .innerHTML="Combo-BRFC: Overall, no better than a coin toss at predicting employees who left but far better at predicting those who stayed."; 
} 

function techbrfc(){ 
  document.getElementById('myImage') 
  .src="static/images/Tech_Results.png"; 
  document.getElementById('title') 
  .innerHTML="Results-Tech: Balanced Random Forest Classifier"; 
  document.getElementById('description') 
  .innerHTML="Tech-BRFC: Overall the model was worse than a coin toss at predicting employees who left, but far better at predicting those who stayed"; 
} 

function nontechbrfc(){ 
  document.getElementById('myImage') 
  .src="static/images/NonTech-BRFC_Results.png"; 
  document.getElementById('title') 
  .innerHTML="Results-NonTech: Balanced Random Forest Classifier"; 
  document.getElementById('description') 
  .innerHTML="NonTech-BRFC: Overall, worse than a coin toss at predicting employees who left, but far better at predicting those who stayed"; 
} 

function nontechsmot(){ 
  document.getElementById('myImage') 
  .src="static/images/NonTech-SMOTEENN+RFC_Results.png"; 
  document.getElementById('title') 
  .innerHTML="Results-NonTech: SMOTEENN + Random Forest Classifier"; 
  document.getElementById('description') 
  .innerHTML="NonTech-SMOTEENN+RFC: Overall, although accuracy is better, the F1 score is no better than a coin toss at predicting people who leave; ability to predict those who stay is less accurate than the BRFC model"; 
} 

function ldrshpbrfc(){ 
  document.getElementById('myImage') 
  .src="static/images/Ldrshp-BRFC_Results.png"; 
  document.getElementById('title') 
  .innerHTML="Results-Ldrshp: Balanced Random Forest Classifier"; 
  document.getElementById('description') 
  .innerHTML="Ldrshp-BRFC: Overall, completely unable to predict employees who left, but far better at predicting those who stayed, aka did not attrit"; 
} 

function ldrshpsmot(){ 
  document.getElementById('myImage') 
  .src="static/images/Ldrshp-SMOTEEN+RFC_Results.png"; 
  document.getElementById('title') 
  .innerHTML="Results-Ldrshp: SMOTEENN + Random Forest Classifier"; 
  document.getElementById('description') 
  .innerHTML="Lrdshp-SMOTEENN+RFC: Overall, far less able to predict employees who left as opposed to BRFC; although predicted employees who stayed better, it is still an unreliable model"; 
}

function ldrshpros(){ 
  document.getElementById('myImage') 
  .src="static/images/Ldrshp-ROS+RFC_Results.png"; 
  document.getElementById('title') 
  .innerHTML="Results-Ldrshp: ROS + Random Forest Classifier"; 
  document.getElementById('description') 
  .innerHTML="Overall, far less able to predict employees who left as opposed to BRFC; although predicted employees who stayed better, it is still an unreliable model";
}
