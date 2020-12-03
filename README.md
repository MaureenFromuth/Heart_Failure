# Heart_Failure

## Overview of Project

### Purpose of the Project

Why do people leave a company!?  This is a question that is often on the topic of most managers minds, particularly as competition in a particular career increases.  One of the most complex spaces currently is in the tech industry, commonly referred to as Silicon Valley.  While the Valley is filled with small start ups, it also consistent of large tech giants like AWS, IBM, Microsoft, etc.  Particularly now as the tech field rises in importance due to the need for telework and COVID analytics, firms want to know how to keep the professionals that they have invested in.  The purpose of this study is to look at features, specific to IBM employees, and assess how these factors impact a person’s decision to say or leave the company.  In understanding how these features impact the company’s attrition, management can evaluate personnel against those factors to identify potential risks and make person-specific recommendations, and/or management can make HR decisions that decrease the overall risk of attrition for the entire company with personnel wide changes.  

As part of this study, we are hoping to answer the following two primary questions:

- **1. What features are most indicative of a person’s likelihood to leave IBM?**

- **2. If I have a specific person, and their data for the associated features, what is the prediction that they will stay or leave IBM?**


As part of building the analysis and models to these questions, however, we are also looking to identify the following:

- **What, if any, correlation is there between different features, i.e. do you truly get paid more the longer you are at a company?**

- **Are there any trends between features, e.g. do personnel who have a longer commute or who travel have a lower job satisfaction?


### Project Breakdown

This project has four distinct parts:
- Exploratory Analysis
- Data Cleansing and Preparation
- Building and Deploying the Model
- Data Visualization

As part of the Exploratory Analysis section, we are going to dissect and analyze the core data set for this project: [IBMEmployeeAttrition.csv](https://github.com/MaureenFromuth/IBM_Attrition/blob/Segment-1/Data/IBMEmployeeAttrition.csv).  This dataset has has multiple fields that not only provide background information about the employee, but also about their role/job, their salary, their job history, and their satisfaction rating in various categories.  Of note, for the satisfaction ratings, we provided seven related .csv files that explain the numerical ratings: [Education](https://github.com/MaureenFromuth/IBM_Attrition/blob/Segment-1/Data/Education.csv), [EnvironmentalSatisfaction](https://github.com/MaureenFromuth/IBM_Attrition/blob/Segment-1/Data/EnvironmentSatisfaction.csv), [JobInvolvement](https://github.com/MaureenFromuth/IBM_Attrition/blob/Segment-1/Data/JobInvolvement.csv), [JobSatisfaction](https://github.com/MaureenFromuth/IBM_Attrition/blob/Segment-1/Data/JobSatisfaction.csv), [PerformanceRating](https://github.com/MaureenFromuth/IBM_Attrition/blob/Segment-1/Data/PerformanceRating.csv), [RelationshipSatisfaction](https://github.com/MaureenFromuth/IBM_Attrition/blob/Segment-1/Data/RelationshipSatisfaction.csv), and [WorkLifeBalance](https://github.com/MaureenFromuth/IBM_Attrition/blob/Segment-1/Data/WorkLifeBalance.csv).  

To better analyze this data, we imported these .csv files into an RDS instance in AWS, and imported them into
