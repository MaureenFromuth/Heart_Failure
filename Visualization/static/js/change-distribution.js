//distribution buttons and changes

function age(){ 
  document.getElementById('myImage') 
  .src="static/images/Age-Cat_Distribution.png"; 
  document.getElementById('title') 
  .innerHTML="Age Distribution per JobCategory"; 
  document.getElementById('description') 
  .innerHTML="Age distribution looks relatively normal for each of the JobCategories.  Of note, however, the Leadership category tends to skew more to the right and is not as evently distributed as the other categories.  This is not surprisng given leaders tend to be older, and it also compliments the correlation data we found."; 
} 

function yearsrole(){ 
  document.getElementById('myImage') 
  .src="static/images/YrsInCurrRole vs Cat-Distribution.png"; 
  document.getElementById('title') 
  .innerHTML="Years In Current Role Distribution per JobCategory"; 
  document.getElementById('description') 
  .innerHTML="Unlike Age distribution, the YearsInCurrentRole is slightly less normally distributed.  Interestingly, all three JobCategories have two major peaks in their distribution: one at around 3-4 years and a second between 7-8 years.  With Leadership, however, that jump is realitvely smaller for the 3-4 years.  You can see from this that people tend to change jobs around those two periods, and, with the exception of Leadership, the majority of the switches occur around the 3-4 year mark in a role."; 
} 

function monthlyrate(){ 
  document.getElementById('myImage') 
  .src="static/images/MonthlyRate vs Cat_distribtuion.png"; 
  document.getElementById('title') 
  .innerHTML="MonthlyIncome Distribution per JobCategory"; 
  document.getElementById('description') 
  .innerHTML="Similar to the YearsInCurrRole distribution, the distribution of the MonthlyRate per JobCategory is less evenly distributed than Age.  The Non-Tech category appears to have two spikes in distribution around 10K and 23K, whereas the Tech and Leadership distributions are skewed opposite one another.  As such, Tech appears to have a spike in distribution around 9K and Leadership around 22K.  If Tech attrition becomes an issue, this could be a mechanism to increase attrition in this category, namely by shifting the distribution for Tech to the right."; 
} 

//comparitive distribution buttons and changes

function stockvsmaritial(){ 
  document.getElementById('myImage2') 
  .src="static/images/Maritial-Stock_Distribution.png"; 
  document.getElementById('title2') 
  .innerHTML="StockLevel vs. Maritial Status Distribution"; 
  document.getElementById('description2') 
  .innerHTML="As identified in our correlation matrix, there is a negative relationship between maritial status and stock option level, namely that married individuals tend to have higher stock option levels.  A potential explaination for this is that generally married individuals tend to be older and thus more senior.  Of note in this graph, however, those with a stock option level of 3 are all divorced.  Additional research should be completed in this area to look at those indivdiuals job levels, job categories, and work life balance to look for trends."; 
} 

function jobvsmaritial(){ 
  document.getElementById('myImage2') 
  .src="static/images/Job Level vs Maritial Status.png"; 
  document.getElementById('title2') 
  .innerHTML="JobLevel vs. Maritial Status Distribution"; 
  document.getElementById('description2') 
  .innerHTML="Much like StockOptionLevels, the proponderance of employees at the higher levels are married with the majority of lower employees split between married and single.  Although this is common, there are, in fact, no single or divorced personnel in more senior levels, only married ones.  This could diswuade personnel who are single by choice and/or who are divorced from staying around as there is no one 'like them' in senior roles.  This should be further studied."; 
} 

function catvswlb(){ 
  document.getElementById('myImage2') 
  .src="static/images/Job Category vs. WLB.png"; 
  document.getElementById('title2') 
  .innerHTML="JobCategory vs. Work Life Balance Distribution"; 
  document.getElementById('description2') 
  .innerHTML="Looking at the comparisons, there are interesting trends in two areas.  The first is that the Leadership category has no one who rates their balance as 'Best' and the Tech category is the only category with responses as 'Bad'.  Although the 'Bad' may be an outlier, it is worth looking at the data further to identify more specifics about that group of employees.  Additionally, it is worth doing additional research to understand what are the reasons why the Leadership group is not answering 'Best' to identify if there are any mechanisms to support retention, if needed."; 
} 