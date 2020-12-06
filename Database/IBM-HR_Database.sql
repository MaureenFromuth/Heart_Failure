CREATE TABLE "IBMEmployeeAttrition" (
    "Age" int   NOT NULL,
	"Attrition" varchar   NOT NULL,
	"BusinessTravel" varchar   NOT NULL,
	"DailyRate" int   NOT NULL,
	"Department" varchar   NOT NULL,
	"DistanceFromHome" int   NOT NULL,
	"Education" int   NOT NULL,
    "EducationField" varchar   NOT NULL,
	"EmployeeCount" int   NOT NULL,
	"EmployeeNumber" int UNIQUE,
	"EnvironmentSatisfaction" int   NOT NULL,
	"Gender" varchar   NOT NULL,
	"HourlyRate" int   NOT NULL,
	"JobInvolvement" int   NOT NULL,
	"JobLevel" int   NOT NULL,
	"JobRole" varchar   NOT NULL,
	"JobSatisfaction" int   NOT NULL,
	"MaritialStatus" varchar   NOT NULL,
	"MonthlyIncome" int   NOT NULL,
	"MonthlyRate" int   NOT NULL,
	"NumCompaniesWorked" int   NOT NULL,
	"Over18" varchar   NOT NULL,
	"OverTime" varchar   NOT NULL,
	"PercentSalaryHike" int   NOT NULL,
	"PerformanceRating" int   NOT NULL,
	"RelationshipSatisfaction" int   NOT NULL,
	"StandardHours" int   NOT NULL,
	"StockOptionLevel" int   NOT NULL,
	"TotalWorkingYears" int   NOT NULL,
	"TrainingTimesLastYear" int   NOT NULL,
	"WorkLifeBalance" int   NOT NULL,
	"YearsAtCompany" int   NOT NULL,
    "YearsInCurrentRole" int   NOT NULL,
	"YearsSinceLastPromotion" int   NOT NULL,
    "YearsWithCurrManager" int   NOT NULL,
    CONSTRAINT "pk_IBMEmployeeAttrition" PRIMARY KEY (
        "EmployeeNumber"
     )
);

CREATE TABLE "Education" (
    "Score" int  NOT NULL,
    "Education" varchar   NOT NULL,
    PRIMARY KEY ("Score")
);


CREATE TABLE "WorkLifeBalance" (
    "Score" int  NOT NULL,
    "Rating" varchar   NOT NULL,
	PRIMARY KEY ("Score")
);

CREATE TABLE "RelationshipSatisfaction" (
    "Score" int  NOT NULL,
    "Rating" varchar   NOT NULL,
	PRIMARY KEY ("Score")
);

CREATE TABLE "PerformanceRating" (
    "Score" int  NOT NULL,
    "Rating" varchar   NOT NULL,
	PRIMARY KEY ("Score")
);

CREATE TABLE "JobSatisfaction" (
    "Score" int  NOT NULL,
    "Rating" varchar   NOT NULL,
	PRIMARY KEY ("Score")
);

CREATE TABLE "JobInvolvement" (
    "Score" int  NOT NULL,
    "Rating" varchar   NOT NULL,
	PRIMARY KEY ("Score")
);

CREATE TABLE "EnvironmentSatisfaction" (
    "Score" int  NOT NULL,
    "Rating" varchar   NOT NULL,
	PRIMARY KEY ("Score")
);

ALTER TABLE "IBMEmployeeAttrition"
ADD FOREIGN KEY ("Education") REFERENCES "Education" ("Score");

ALTER TABLE "IBMEmployeeAttrition"
ADD FOREIGN KEY ("WorkLifeBalance") REFERENCES "WorkLifeBalance" ("Score");

ALTER TABLE "IBMEmployeeAttrition"
ADD FOREIGN KEY ("RelationshipSatisfaction") REFERENCES "RelationshipSatisfaction" ("Score");

ALTER TABLE "IBMEmployeeAttrition"
ADD FOREIGN KEY ("PerformanceRating") REFERENCES "PerformanceRating" ("Score");

ALTER TABLE "IBMEmployeeAttrition"
ADD FOREIGN KEY ("JobSatisfaction") REFERENCES "JobSatisfaction" ("Score");

ALTER TABLE "IBMEmployeeAttrition"
ADD FOREIGN KEY ("JobInvolvement") REFERENCES "JobInvolvement" ("Score");

ALTER TABLE "IBMEmployeeAttrition"
ADD FOREIGN KEY ("EnvironmentSatisfaction") REFERENCES "EnvironmentSatisfaction" ("Score");
