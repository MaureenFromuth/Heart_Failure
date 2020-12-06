## Overview of Project

### Purpose of the Project

Why do people leave a company … and when!?  These questions are some of the most critical topics for businesses, as any answer helps to build mechanisms and incentives for retention and also helps to drive recruiting efforts up or down based on expected attrition rates.  With regards to retention, companies often invest a great deal in their employees with training, mentoring, equipment, and time.  As such, understanding how mechanisms that can improve support to their employees is critical to a smart investment strategy.  For example, is it worth giving employees a monetary retention bonus if the biggest factor for leaving is a lack of work life balance?  On the opposite side, it is assumed that companies will lose employees but knowing or being able to predict the risk for attrition of a group of employees can help drive appropriate recruiting efforts.  For example, if you have anonymous monthly or daily satisfaction survey’s of employees, can you predict on a monthly basis how many of them are going to leave?  If the number of employees is higher than normal, you can increase your recruiting to make up for the potential attrition.  

These topics are even more critical in industries that require high demand skill sets, particularly in Science, Technology, Engineering, and Math (STEM) roles, as well as leadership and human resources.  Each of these job categories are unique and have different tasks, processes, and pay.  As such, their experiences at a company can be unique based on these differences.  To best understand what mechanisms work best to keep individual job categories, it is helpful to look at each of them separately.  Likewise, each job category requires a different approach to recruiting, and as such building predictive models to asses whether a group of employees will stay or go will also help accuracy of recruiting efforts.  

Using anonymous HR data of a tech firm, this project is going to utilize multiple data science tools to answer the following primary questions:

    *1. What features are most indicative of a person’s likelihood to leave IBM?*

    *2. Given additional anonymous HR data of employees, and their data for the associated features, what is the prediction that they will stay or leave IBM?*

    *3. How do the answer to either of the previous questions change for each of the three job categories: tech, non-tech, and leadership?*


As part of building the analysis and models to these questions, however, there are additional insights that will be relevant to the overall story:

- *What, if any, correlation is there between different features, i.e. do you truly get paid more the longer you are at a company? Are there any surprises?*

- *Are there any major differences in features between the job categories, i.e. does leadership roles have higher or lower work life balance?*

Of note, this analysis, predictions, and implementation of mechanisms is best done anonymously and using data that does not target individual employees.  While most employers maintain general data on their employees, employers must remain sensitive to specific questions and should keep data generic and focused on performance and optional surveys.  

### Project Breakdown

This project has four distinct parts:
- Data Cleansing and Preparation
- Preliminary Exploratory Analysis
- Building and Deploying the Model
- Data Visualization


***Data Cleansing and Preparation***

As part of the Data Cleansing and Preparation section, we loaded, cleaned, and transformed the core data set for this project: [IBMEmployeeAttrition.csv](https://github.com/MaureenFromuth/IBM_Attrition/blob/Segment-1/Data/IBMEmployeeAttrition.csv).  This dataset has has multiple fields that not only provide background information about the employee, but also about their role/job, their salary, their job history, and their satisfaction rating in various categories.  Of note, for the satisfaction ratings, we provided seven related .csv files that explain the numerical ratings: [Education](https://github.com/MaureenFromuth/IBM_Attrition/blob/Segment-1/Data/Education.csv), [EnvironmentalSatisfaction](https://github.com/MaureenFromuth/IBM_Attrition/blob/Segment-1/Data/EnvironmentSatisfaction.csv), [JobInvolvement](https://github.com/MaureenFromuth/IBM_Attrition/blob/Segment-1/Data/JobInvolvement.csv), [JobSatisfaction](https://github.com/MaureenFromuth/IBM_Attrition/blob/Segment-1/Data/JobSatisfaction.csv), [PerformanceRating](https://github.com/MaureenFromuth/IBM_Attrition/blob/Segment-1/Data/PerformanceRating.csv), [RelationshipSatisfaction](https://github.com/MaureenFromuth/IBM_Attrition/blob/Segment-1/Data/RelationshipSatisfaction.csv), and [WorkLifeBalance](https://github.com/MaureenFromuth/IBM_Attrition/blob/Segment-1/Data/WorkLifeBalance.csv).  This data is hosted in Postgres in a PGAdmin instance.  See below for the ERD and data structure.

>[IBM_Data_Structure]()

To prepare for both the model development as well as the visualization, created two key categories of dataframes: one that was encoded and scaled for the ML model training, and one that incorporated the explanation of the satisfaction and survey ratings (df_attrition_scaled vs. df_attrition).  To build these two main dataframes, we first used SQLAlchemy in Python to load the IBMEmployeeAttrition database and make the EmployeeNumber the index.  From there, we did initial cleansing of the data by looking for and dropping null data fields, as well as dropping columns that did not provide relevant data.  While there were no null values, there were three columns that had the same value for every row and that we decided to drop: EmployeeCount, StandardHours, and Over18.  

Next we created a new column, ‘JobCategory’ with new fields based off of the job role.  Using a dictionary of the roles and their associated category, we assigned a new feature to each employee and tagged the record as either technical, non-technical, or in a leadership position.  Technical positions made up the majority of the records, with non-technical and leadership coming in second and third respectively.  The resulting dataframe provided us the foundation for the two primary dataframes.  

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

*The Encoded & Scaled Dataframe* Using this baseline, we utilized the label encoding feature in Scikit-Learn to transform the existing objects columns into integers.   Before executing the following code, however, we created a copy of the baseline dataframe from which we worked, df_attrition_encoded.

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
Finally, we utilized the Standard Scaler feature also in Scikit-Learn to normalize and scale the resulting dataframes.  

``` 
data_scaler = StandardScaler()
df_attrition_scaled = pd.DataFrame(data_scaler.fit_transform(df_attrition_encoded), 
                                    columns = df_attrition_encoded.columns)
``` 

*The Visualization Dataframe* Using the same baseline dataframe as the first spin-off, we added the survey definitions for each associated field using a combination of a dictionary and a lambda function.  The resulting dataframe will be a core element for the project visualization dashboard.  

``` 
#Identify the scoring definitions within the compiled dataframe 
education = {1: 'Below College', 2: 'College', 3: 'Bachelor', 4: 'Master', 5: 'Doctor'}
satisfaction = {1: 'Low', 2: 'Medium', 3: 'High', 4: 'Very High'}
involvement = {1: 'Low', 2: 'Medium', 3: 'High', 4: 'Very High'}
performance = {1: 'Low', 2: 'Good', 3: 'Excellent', 4:'Outstanding'}
balance = {1: 'Bad', 2: 'Good', 3: 'Better', 4: 'Best'}

df_attrition["Education"] = df_attrition["Education"].apply(lambda x: education[x])
df_attrition["EnvironmentSatisfaction"] = df_attrition["EnvironmentSatisfaction"].apply(lambda x: satisfaction[x])
df_attrition["JobInvolvement"] = df_attrition["JobInvolvement"].apply(lambda x: involvement[x])
df_attrition["JobSatisfaction"] = df_attrition["JobSatisfaction"].apply(lambda x: satisfaction[x])
df_attrition["PerformanceRating"] = df_attrition["PerformanceRating"].apply(lambda x: performance[x])
df_attrition["WorkLifeBalance"] = df_attrition["WorkLifeBalance"].apply(lambda x: balance[x])
``` 

*Job Category Subsets* For each of these two dataframes, we also broke them down into three sub frames: one for tech roles, one for non-tech roles, and one for leadership roles.  Below is example code for this action.  This results in 8 total dataframes with four for visualization, which we loaded back into Postgres, and four for training of ML models for prediction and feature ranking analysis.  

``` 
#Create a second dataframe that only contains only employees in the 'Tech' job category
df_attrition_tech = df_attrition[df_attrition["JobCategory"] == "Tech"]
df_attrition_tech = df_attrition_tech.drop(columns=['JobCategory'])

df_attrition_tech_scaled = df_attrition_scaled[df_attrition_scaled["JobCategory"] == 2]
df_attrition_tech_scaled = df_attrition_tech_scaled.drop(columns=['JobCategory'])

df_attrition_tech.head(5)
``` 


***Preliminary Data Analysis**


