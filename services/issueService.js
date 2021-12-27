import { executeQuery } from "../database/database.js";


/* Part 2*/

const findCurrentIssues = async (project_id) => {
  let result = await executeQuery(
    "SELECT * FROM project_issues WHERE project_id = $1;", project_id,);
    return result.rows;
};


/* Part 3 */
const createIssue = async (project_id, description) => {
  await executeQuery(
    "INSERT INTO project_issues (project_id, description) VALUES ($1, $2);", project_id, description, );
};

/* Part 4*/
const removeIssue = async (id) => {
  await executeQuery("DELETE FROM project_issues WHERE id = $1;", id);
};


/*
const createWorkEntry = async (task_id) => {
  await executeQuery(
    "INSERT INTO work_entries (task_id, started_on) VALUES ($1, NOW());",
    task_id,
  );
}; */


export { findCurrentIssues, createIssue , removeIssue};

/*
const finishIssue = async (id) => {
  await executeQuery("DELETE FROM project_issues WHERE id = $1;", id);
};
//////


import { executeQuery } from "../database/database.js";



const findCurrentWorkEntry = async (task_id) => {
  let result = await executeQuery(
    "SELECT * FROM work_entries WHERE task_id = $1 AND finished_on IS NULL;",
    task_id,
  );

  if (result.rows && result.rows.length > 0) {
    return result.rows[0];
  }

  return false;
};

const finishWorkEntry = async (id) => {
  await executeQuery(
    "UPDATE work_entries SET finished_on = NOW() WHERE id = $1;",
    id,
  );
};

const calculateTotalTime = async (task_id) => {
  let result = await executeQuery(
    `SELECT SUM(finished_on - started_on) AS total_time 
      FROM work_entries 
      WHERE task_id = $1 
        AND finished_on IS NOT NULL`,
    task_id,
  );

  if (result.rows && result.rows[0] && result.rows[0].total_time) {
    return result.rows[0].total_time;
  }

  return 0;
};

export { calculateTotalTime, createWorkEntry, findCurrentWorkEntry, finishWorkEntry };

*/