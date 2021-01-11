//changes for feature graph or chart

function graph(){ 
  document.getElementById('myImage') 
  .src="static/images/FeatureImportance_Noted.png"; 
  document.getElementById('title') 
  .innerHTML="Graph: Feature Importance Comparison"; 
} 

function chart(){ 
  document.getElementById('myImage') 
  .src="static/images/Feature-Comparison_Chart.png"; 
  document.getElementById('title') 
  .innerHTML="Chart: Feature Importance Comparison";
} 
