# IBM_Attrition

## Overview of Project

### Purpose of the Project

Why do people leave a company … and when!?  These questions are some of the most critical topics for businesses, as any answer helps to build mechanisms and incentives for retention and also helps to drive recruiting efforts up or down based on expected attrition rates.  

With regards to retention, companies often invest a great deal in their employees with training, mentoring, equipment, and time.  As such, understanding how mechanisms that can improve support to their employees is critical to a smart investment strategy.  For example, is it worth giving employees a monetary retention bonus if the biggest factor for leaving is a lack of work life balance?  

On the opposite side, it is assumed that companies will lose employees but knowing or being able to predict the risk for attrition of a group of employees can help drive appropriate recruiting efforts.  For example, if you have anonymous monthly or daily satisfaction survey’s of employees, can you predict on a monthly basis how many of them are going to leave?  If the number of employees is higher than normal, you can increase your recruiting to make up for the potential attrition.  

These topics are even more critical in industries that require high demand skill sets, particularly in Science, Technology, Engineering, and Math (STEM) roles, as well as leadership and non-tech roles such as sales and human resources.  Each of these job categories are unique and have different tasks, processes, and pay structures.  As such, an employee’s experience at a company can be unique as a result of these differences.  To best understand what mechanisms work best to keep individual job categories, it is helpful to look at each of them separately.  Likewise, each job category requires a different approach to recruiting, and as such building predictive models to asses whether a group of employees will stay or go will also help accuracy of recruiting efforts.  

Using anonymous HR data of a tech firm, this project is going to utilize multiple data science tools to answer the following primary questions:

    1. What features are most indicative of a person’s likelihood to leave IBM?

    2. Given additional anonymous HR data of employees, and their data for the associated features, what is the prediction that they will stay or leave IBM?

    3. How do the answer to either of the previous questions change for each of the three job categories: tech, non-tech, and leadership?


As part of building the analysis and models to these questions, however, there are additional insights that will be relevant to the overall story:

    1. What, if any, correlation is there between different features, i.e. do you truly get paid more the longer you are at a company? Are there any surprises?

    2. Are there any major differences in features between the job categories, i.e. does leadership roles have higher or lower work life balance?

Of note, this analysis, predictions, and implementation of mechanisms is best done anonymously and using data that does not target individual employees.  While most employers maintain general data on their employees, employers must remain sensitive to specific questions and should keep data generic and focused on performance and optional surveys.  

### Project Breakdown

An overview of the project and additional details can be found in the following [presentation](https://github.com/MaureenFromuth/IBM_Attrition/blob/main/Presentation_Final%20Project.pptx.pdf).

This project has four distinct parts:
- Data Cleansing and Preparation
- Preliminary Data Exploration
- Building and Deploying the Model
- Data Visualization

The tools and technology used for each of these phases include:
- Data Cleaning & Analysis - We will be using a combination of Python, Pandas, Numpy, SQLAlchemy, and SciKitLearn for ETL, and Matplotlib and Seaborn for graph analysis.  
- Database Storage - We will host our database in Postgres in PgAdmin.
- Machine Learning - For our predictive modeling, we are going to build a binary classification model using SciKitLearn in Python.  As a result of uneven data, we will also be using a combination of over and undersampling techniques to ensure there is more even target data.
- Dashboard - In addition to using a Flask template, we are going to integrate Javascript and D3 for a fully functional dashboard along with Tableau visuals.  It will be hosted on an S3 static website.  



***Data Cleansing and Preparation***

As part of the Data Cleansing and Preparation section, we loaded, cleaned, and transformed the core data set for this project: [IBMEmployeeAttrition.csv](https://github.com/MaureenFromuth/IBM_Attrition/blob/main/Data/IBMEmployeeAttrition.csv).  This dataset is a synthetic, anonymous HR dataset that has has multiple fields that not only provide background information about the employee (does not include any personal identifiable information), but also about their role/job, their salary, their job history, and their satisfaction rating in various categories.  This data is hosted in Postgres in a PGAdmin instance.  See below for the ERD and data structure.

Of note, for the satisfaction ratings, we provided seven related .csv files that explain the numerical ratings: 
- [Education](https://github.com/MaureenFromuth/IBM_Attrition/blob/main/Data/Education.csv) 
- [EnvironmentalSatisfaction](https://github.com/MaureenFromuth/IBM_Attrition/blob/main/Data/EnvironmentSatisfaction.csv)
- [JobInvolvement](https://github.com/MaureenFromuth/IBM_Attrition/blob/main/Data/JobInvolvement.csv)
- [JobSatisfaction](https://github.com/MaureenFromuth/IBM_Attrition/blob/main/Data/JobSatisfaction.csv)
- [PerformanceRating](https://github.com/MaureenFromuth/IBM_Attrition/blob/main/Data/PerformanceRating.csv)
- [RelationshipSatisfaction](https://github.com/MaureenFromuth/IBM_Attrition/blob/main/Data/RelationshipSatisfaction.csv)
- [WorkLifeBalance](https://github.com/MaureenFromuth/IBM_Attrition/blob/main/Data/WorkLifeBalance.csv)

>![IBM_Data_Structure](https://github.com/MaureenFromuth/IBM_Attrition/blob/main/Database/ERD_IBM-HR_Picture.png)

To prepare for both the model development as well as the visualization, created two key categories of dataframes: one that was encoded for the ML model training, and one that incorporated the explanation of the satisfaction and survey ratings (df_attrition_encoded vs. df_attrition).  To build these two main dataframes, we first used SQLAlchemy in Python to load the IBMEmployeeAttrition database and make the EmployeeNumber the index.  

Next we started our baseline ETL and data cleansing.  First, we looked for and dropped any null data fields.  There were no null values for this particular dataset.  Next we created a new column, ‘JobCategory’ with new fields based off of the job role.  Using a dictionary of the roles and their associated category, we assigned a new feature to each employee and tagged the record as either technical, non-technical, or in a leadership position.  Technical positions made up the majority of the records, with non-technical and leadership coming in second and third respectively.  


```
#Take the JobRoles and create a new dictionary of the JobRoles and their categories
job_dict = {'Manager': 'Leadership', 'Manufacturing Director': 'Leadership', 'Research Director': 'Leadership', 
            'Sales Executive': 'Non-Tech', 'Human Resources': 'Non-Tech', 'Sales Representative': 'Non-Tech', 
            'Human Resources': 'Non-Tech', 'Research Scientist': "Tech", 'Laboratory Technician':"Tech", 
            'Healthcare Representative': 'Tech'}

#Create a new column in original dataframe that identifies each employee as 'tech', 'non-tech', or 'leadership' using a new function
def job_category(df_attrition):
    df_attrition['JobCategory'] = ''
    for i, value in df_attrition['JobRole'].items():
        df_attrition.at[i, "JobCategory"] = job_dict[value]
job_category(df_attrition)
df_attrition.head(5)
``` 


The resulting dataframe provided us the foundation for the two primary dataframes: the visualization dataframe and the encoded dataframe.  

*The Visualization Dataframe* Using the same baseline dataframe we exported the df_attrition dataframe back into Postgres in a new table called attrition_combined.  Using SQL, we created a new table, [attrition_combined_text](https://github.com/MaureenFromuth/IBM_Attrition/blob/main/New%20Tables/attrition_combined_text.csv) using a left join with the eight definition tables for each of the survey responses.  This table will have the text fields now to support the visualization requirement.  

```
--Join tables to turn numerical values into text
SELECT attrition_combined.*, 
    e1."Education" as "Education_Text",
    es."Rating" as "EnvironmentSat_Text",
    ji."Rating" as "JobInvolvement_Text",
    js."Rating" as "JobSatisfaction_Text",
    pr."Rating" as "PerformanceRating_Text",
    rs."Rating" as "RelationshipSat_Text",
    wb."Rating" as "WorkLifeBalance_Text"
INTO attrition_combined_text
FROM attrition_combined
LEFT JOIN "Education" AS e1 ON
    attrition_combined."Education" = e1."Score"  
LEFT JOIN "EnvironmentSatisfaction" AS es ON 
    attrition_combined."EnvironmentSatisfaction" = es."Score"
LEFT JOIN "JobInvolvement" AS ji ON 
    attrition_combined."JobInvolvement" = ji."Score"
LEFT JOIN "JobSatisfaction" AS js ON 
    attrition_combined."JobSatisfaction" = js."Score"
LEFT JOIN "PerformanceRating" AS pr ON 
    attrition_combined."PerformanceRating" = pr."Score"
LEFT JOIN "RelationshipSatisfaction" AS rs ON 
    attrition_combined."RelationshipSatisfaction" = rs."Score"
LEFT JOIN "WorkLifeBalance" AS wb ON 
    attrition_combined."WorkLifeBalance" = wb."Score";  

--Drop numerical columns from the new table
ALTER TABLE attrition_combined_text
DROP "Education", 
DROP "EnvironmentSatisfaction",
DROP "JobInvolvement",
DROP "JobSatisfaction",
DROP "PerformanceRating",
DROP "RelationshipSatisfaction",
DROP "WorkLifeBalance";
```


*The Encoded Dataframe* Using the same baseline, we needed to do some initial data assessments and conduct a few more transformations to allow for in depth data exploration.  More specifically, we looked at the statistical assessments of each of the features.  There were four columns that had the same value for every row and that we decided to drop: EmployeeCount, StandardHours, Over18, and Department.  Additionally, we utilized the label encoding feature in Scikit-Learn to transform the existing objects columns into integers.   Before executing the following code, however, we created a copy of the baseline dataframe from which we worked, df_attrition_encoded.

``` 
#Use sk learn labelencoder for encoding
le = LabelEncoder()
#Gender - Female = 0, Male = 1
df_attrition_encoded['Gender'] = le.fit_transform(df_attrition_encoded['Gender'])
#Attrition - Yes = 1, No = 0
df_attrition_encoded['Attrition'] = le.fit_transform(df_attrition_encoded['Attrition'])
#Dept - 0 = HR, 1 = R&D, 2 = Sales
df_attrition_encoded['Department'] = le.fit_transform(df_attrition_encoded['Department'])
#Category - 0 = Leadership, 1 = NonTech, 2 = Tech
df_attrition_encoded['JobCategory'] = le.fit_transform(df_attrition_encoded['JobCategory'])
#Overtime - No = 0, Yes = 1
df_attrition_encoded['OverTime'] = le.fit_transform(df_attrition_encoded['OverTime'])
#Maritial Staus - Single = 2, 1 = Married, 0 = Divorced
df_attrition_encoded['MaritialStatus'] = le.fit_transform(df_attrition_encoded['MaritialStatus'])
#Business Travel - Travel_Rarely = 2, Travel_Frequently	 = 1, Non-Travel = 0
df_attrition_encoded['BusinessTravel'] = le.fit_transform(df_attrition_encoded['BusinessTravel'])
#Education Field - HR = 0, Life Science = 1, Marketing = 2, Medical = 3, Other = 4, Technical = 5
df_attrition_encoded['EducationField'] = le.fit_transform(df_attrition_encoded['EducationField'])
#Job Role - Sales Exec = 7, Research Scientist - 6, Research Director = 5, Manufacturing Director - 4, 
#Lab Tech - 2, HR = 1, Healthcare Rep = 0
df_attrition_encoded['JobRole'] = le.fit_transform(df_attrition_encoded['JobRole'])
``` 

As the last step in building out our encoded dataframe, we assessed two groups of features to identify how and/or if they should be combined.  

First, we assessed HourlyRate, DailyRate, MonthlyRate and MonthlyIncome.  We build a new dataframe to compare the relationship to one another.  For example, how does the ‘HourlyRate’ x 8 compare to the ‘DailyRate’ and so forth.  From this analysis, we determined that there was a clear relationship between the HourlyRate, DailyRate, and MonthlyRate, but the MonthlyIncome appeared to be independent.  We also looked at the distribution of each of the variables.  While the ‘rate’ features were fairly evenly distributed, the MonthlyRate was the most evenly distributed.  As such, we decided to keep both the MonthlyRate and the MonthlyIncome.  

![HourlyRate Distribution](https://github.com/MaureenFromuth/IBM_Attrition/blob/main/Prelim%20Data%20Analysis/HourlyRate_Distribution.png)

![DailyRate Distribution](https://github.com/MaureenFromuth/IBM_Attrition/blob/main/Prelim%20Data%20Analysis/DailyRate_Distribution.png)

![MonthlyRate Distribution](https://github.com/MaureenFromuth/IBM_Attrition/blob/main/Prelim%20Data%20Analysis/MonthlyRate_Distribution.png)

![MonthlyIncome Distribution](https://github.com/MaureenFromuth/IBM_Attrition/blob/main/Prelim%20Data%20Analysis/MonthlyIncome_Distribution.png)

Second, we assessed ‘Age’ and ‘TotalWorkingYears’.  Like the previous group, we built a new dataframe to compare the differences between the two features.  Upon analysis, it did not appear as though these variables were dependent upon one another.  We did look into the distribution of each of the features, and they did have relatively similar distributions, specifically skewed left.  As a result, we decided to keep both features for the final model assessment.   

![Age vs. TotalWorkingYears Descriptions](https://github.com/MaureenFromuth/IBM_Attrition/blob/main/Prelim%20Data%20Analysis/Age-TotalWorkingYears_Difference.png)

*Job Category Subsets* For each of these two dataframes, we also broke them down into three sub frames: one for tech roles, one for non-tech roles, and one for leadership roles.  We executed this in Python for the encoded dataframe and within Postgres for the visualization tables.  Below is example code for this action.    

``` 
#Create a second dataframe that only contains only employees in the 'Tech' job category
df_attrition_tech_encoded = df_attrition_encoded[df_attrition_encoded[“JobCategory"] == 2]
df_attrition_tech_encoded = df_attrition_tech_encoded.drop(columns=['JobCategory'])

df_attrition_tech.head(5)
``` 

``` 
SELECT * 
INTO attrition_tech_text
FROM "IBMEmployeeAttrition"
WHERE 'JobCategory' = 'Tech';
``` 

This results in 8 total dataframes with four for visualization, which are hosted in Postgres, and four for training of ML models for prediction and feature ranking analysis.  Below lists all of the dataframes and/or tables.

Combined:

Postgres - [attrition_combined_text](https://github.com/MaureenFromuth/IBM_Attrition/blob/main/New%20Tables/attrition_combined_text.csv)

Python - df_attrition_encoded

Non-Tech:

Postgres - [attrition_nontech_text](https://github.com/MaureenFromuth/IBM_Attrition/blob/main/New%20Tables/attrition_nontech_text.csv)

Python - df_attrition_nontech_encoded

Tech:
 
Postgres - [attrition_tech_text](https://github.com/MaureenFromuth/IBM_Attrition/blob/main/New%20Tables/attrition_tech_text.csv)

Python - df_attrition_tech_encoded

Leadership: 

Postgres - [attrition_ldrshp_text](https://github.com/MaureenFromuth/IBM_Attrition/blob/main/New%20Tables/attrition_ldrshp_text.csv)

Python - df_attrition_ldrshp_encoded



***Preliminary Data Exploration***

To better understand the data and the impact that data may have on the answers to our overall questions, we conducted exploratory data analysis.  In this phase of the project, we assessed four key areas:

1. Explore the imbalance in the target
2. Explore the correlation between features
3. Explore the distribution of the features
4. Explore the distribution of features to one another

To execute this analysis we used a combination of correlation heat maps and distribution graphs in Seaborn as well as some visualization analytics in Tableau.  

Results of this analysis and overall conclusions are highlighted in the Results section of this ReadMe.



***Model Development and Deployment***

Attrition is what we are trying to predict, and as a result our target will be the ‘Attrition’ field with the other fields acting as features for our model.  Because we are trying to predict one of two outcomes, we chose to use a binary classification model to both build our predictions as well as assess the importance of features for attrition.  There are multiple types of binary classification algorithms that can be used for a use case such as this.  They include logistic regression, SVM, decision trees, and ensemble methods such as random forest and boot strapping.  Because there are number of features, to include the target feature, with inconsistent representation and also because we want to identify importance of features to the prediction, we decided to use an ensemble technique, specifically Random Forest.  Random Forest also does not require scaling of data, which is useful for this use case in order to preserve the analysis of feature importance.

Our preliminary data analysis revealed class imbalance in the combined dataframe, as well as the leadership, technical, and non-technical job category sub-dataframes.  As such, we decided to use the Balanced Random Forest algorithm in Imblearn as a baseline to test out different models.  This algorithm conducts and undersampling technique, down selecting the larger class to the smaller class.  Since the class imbalance is fairly significant for all of the dataframes, we will test out a combination and upsampling technique on at least one of the sub-populations to ensure the best model performance.  

While there are clearly benefits of using a Random Forest classifier for this project, there are also limitations.  First, is that random forest models can be challenging for explainability.  Second, is that it can take longer to train.  These limitations, however, will not be major obstacles for this project.  

Results of the model development and deployment, and overall conclusions are highlighted in the Results section of this ReadMe.


***Data Visualization***
As part of our visualization phase, we are building out a dynamic website using a combination of Tableau and Seaborn charts and graphs as well as HTML/CSS.  This will be hosted on an S3 website, and will give users the ability to:
- See the data and sub-category tables
- Understand the project objectives and questions
- Explore key areas of the data analysis phase
- Read and understand the success of our ML models
- Explore feature importance for the various JobCategories
- Understand the conclusions of our project


## Results

### Preliminary Data Exploration

Upon initial review of the data for this project, it is clear that there are a number of different imbalances within the target class (i.e. ‘Attrition’) as well as the features.  The class imbalance is consistently high, in favor of maintain employees, across the combined as well as the the sub-dataframes as depicted below.  In addition 

>![Imbalance Check](https://github.com/MaureenFromuth/IBM_Attrition/blob/main/Prelim%20Data%20Analysis/Class%20Imbalance%20Check.png)

In addition to the class imbalance in the target feature, we also looked at distribution of other variables to validate the assumption of uneven distribution across the dataset.  Similarly to the MonthlyIncome, Age, and TotalWorkingYears distribution charts above that are skewed left, we also dug further into Age, YearsInCurrentRole, and MonthlyRate.  As you can see from the distribution graphs below, the leadership role tends to skew more to the right than the other job categories.  This is not completely surprising, as leaders tend to be more senior.  

![Age Distribution by JobCategory](https://github.com/MaureenFromuth/IBM_Attrition/blob/main/Prelim%20Data%20Analysis/Age-Cat_Distribution.png)

![MonthlyRate Distribution by JobCategory](https://github.com/MaureenFromuth/IBM_Attrition/blob/main/Prelim%20Data%20Analysis/MonthlyRate%20vs%20Cat_distribtuion.png) 

![YearsInCurrentRole Distribution by JobCategory](https://github.com/MaureenFromuth/IBM_Attrition/blob/main/Prelim%20Data%20Analysis/YrsInCurrRole%20vs%20Cat-Distribution.png) 


In addition to distribution we also wanted to evaluate the correlation of features to one another.  To conduct this analysis we used a correlation heat map, depicted below.  


>![Correlation Heatmap](https://github.com/MaureenFromuth/IBM_Attrition/blob/main/Prelim%20Data%20Analysis/Corr-Heat_Combined.png)

Based on the heat map, there are a few areas that highlight strong correlation between one another.  For positive correlations, time-based features such as age, total working years, and years at the company related positively to income and job level.  Likewise, performance was positively correlated to salary hike.  

There were also negative correlations, with one that was somewhat unexpected.  More specifically, job roles and job categories, such as leadership (a value of 0 in the encoded dataframe), resulted higher job levels and income.  

The one curious correlation, however, was between marital status and stock option levels.  Upon deeper analysis through distribution graphs, we can see that most single employees tend to have lower stock levels, divorced employees fall in the middle, and married have higher stock levels.  A potential explanation could be that most younger employees are likely unmarried, and the other employees are either married for the first time or remarried later in life.  This explains why there are no married employees who have a stock option level of 3 in this dataframe as well.

![Stock Option Level vs. Marital Status](https://github.com/MaureenFromuth/IBM_Attrition/blob/main/Prelim%20Data%20Analysis/Maritial-Stock_Distribution.png)


### Model Development and Deployment

For our model testing, we conducted model fitting for all four datatypes, and evaluated their performance at being able to predict attrition.  This project is aiming at a balance of performance in precision as well as recall, but would value precision if one needed to be prioritized.  For example, if the model has high accuracy but low recall, they could be under performing in their recruiting efforts and risk gapping positions.  If, however, they have high accuracy and low precision, they run the risk of ramping up recruiting and then having to turn away perfectly good applicants who may reapply later.  

Below highlights our evaluation of the accuracy and performance scores of each of the models and also helps to assess the best sampling techniques.  


>![Accuracy Reporting: Combination](https://github.com/MaureenFromuth/IBM_Attrition/blob/main/ML%20Model%20Testing/Results_Combo.png)

>![Accuracy Reporting: Tech](https://github.com/MaureenFromuth/IBM_Attrition/blob/main/ML%20Model%20Testing/Results_Tech.png)

>![Accuracy Reporting: NonTech](https://github.com/MaureenFromuth/IBM_Attrition/blob/main/ML%20Model%20Testing/Results_NonTech.png)

>![Accuracy Reporting: Leadership](https://github.com/MaureenFromuth/IBM_Attrition/blob/main/ML%20Model%20Testing/Results_Leadership.png)


Looking at the performance metrics for our models, the accuracy hovers around .7 and the majority of the BRFC models have fairly decent recall (.68-.75) but their precision is not ideal (.39-.40).  The leadership model, however, performed substantially lower in accuracy and precision, but the recall was slightly higher than the other BRFC models.  

Since the dataset for leadership was already significantly small, we tested an oversampling and combination sampling technique and paired that with a random forest classification algorithm.  We also tested the non-tech dates well with the combination sampling technique to ensure there was no improvement of the previous models performance.  As you can see from the data above, while accuracy of the over- and combination-sampling techniques increased the accuracy of the models, they did not improve their overall performance.  This was true as well for the non-tech model using a combination sampling technique.  If you look at the confusion matrix results for the different sampling methods for the leadership job category, you can see that the combination sampling did not pick up any of the employees who attritted, but did have three false positives.  The oversampling technique, however, also failed to pick up the four attrited personnel in the test set, but it did accuracy identify all retained employees. 

>![Compiled Confusion Matrix Results](https://github.com/MaureenFromuth/IBM_Attrition/blob/main/ML%20Model%20Testing/ConfusionMatrix.png)

As a result, we have concluded that the best algorithm for the models is the BRFC.

In addition to evaluating model performance, we also looked at feature importance.  There is additional analysis to be done on this topic, but below highlights the high level results of our initial model testing.

|   | Combined | Tech | NonTech | Leadership |
|---|---|---|---|---|
|1. | MonthlyIncome | MonthlyIncome | DailyRate | MontlyIncome |
| 2. | Age | Age | MonthlyIncome | DailyRate |
| 3. | Overtime | DailyRate | YearsAtCompany | PercentSalaryHike |
| 4. | DailyRate | YearsAtCompany | MonthlyRate | DistanceFromHome |
| 5. | YearsAtCompany | YearsInCurrentRole | Age | MontlyRate |

These top five highlight the importance of salary in retention, but there are some interesting additions here highlighting the importance of years at the company, and perhaps indicate loyalty, within the tech and non-tech roles that we would not have seen in the overall combined group.  Additional analysis will be done to identify whether these features have a positive or negative impact on attrition.  The output of that analysis will better help to build out an understanding of what types of mechanisms or incentives the company can do to retain talent.  




