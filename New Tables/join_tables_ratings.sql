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