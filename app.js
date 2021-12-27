import { serve } from "https://deno.land/std@0.100.0/http/server.ts";
import { configure } from "https://deno.land/x/eta@v1.12.3/mod.ts";
import * as requestUtils from "./utils/requestUtils.js";
import * as projectController from "./controllers/projectController.js";
import * as issueController from "./controllers/issueController.js";

configure({
  views: `${Deno.cwd()}/views/`,
});

let port = 7777;
if (Deno.args.length > 0) {  
  const lastArgument = Deno.args[Deno.args.length - 1];  
  port = Number(lastArgument);
}
const server = serve({ port: port });

for await (const request of server) {
  /* Part 1 */
  if (request.url === "/" && request.method === "GET") {
    await requestUtils.redirectTo(request, "/projects");
  } else if (request.url === "/projects" && request.method === "GET") {
    await projectController.viewAllProjects(request); 
  } else if (request.url === "/projects" && request.method === "POST") {
    await projectController.addProject(request);
  /* Part 2 */
  } else if (request.url.match("projects/[0-9]+") && request.method === "GET"){
    await projectController.viewSingleProject(request);
  /* Part 4 */
  } else if (request.url.match("projects/[0-9]+/issues/[0-9]+") && request.method === "POST"){
    await issueController.removeIssue(request);
  /* Part 3 */
  } else if (request.url.match("projects/[0-9]+/issues") && request.method === "POST"){
    await issueController.createIssue(request);
  /* Part 1 */
  } else if (request.url.match("projects/[0-9]+") && request.method === "POST") {
    await projectController.removeProject(request);
  } else {
    request.respond({ status: 404 });
  }
}
  
  
/*
import { serve } from "https://deno.land/std@0.100.0/http/server.ts";
import { configure } from "https://deno.land/x/eta@v1.12.3/mod.ts";
import * as taskController from "./controllers/taskController.js";
import * as workEntryController from "./controllers/workEntryController.js";
import * as requestUtils from "./utils/requestUtils.js";

configure({
  views: `${Deno.cwd()}/views/`,
});

const server = serve({ port: 7777 });

for await (const request of server) {
  if (request.url === "/" && request.method === "GET") {
    await requestUtils.redirectTo(request, "/tasks");
  } else if (request.url === "/tasks" && request.method === "POST") {
    await taskController.addTask(request);
  } else if (request.url === "/tasks" && request.method === "GET") {
    await taskController.viewTasks(request);
  } else if (request.url.match("tasks/[0-9]+") && request.method === "GET") {
    await taskController.viewTask(request);
  } else if (request.url.match("tasks/[0-9]+/entries[0-9]+") && request.method === "POST") {
    await workEntryController.finishWorkEntry(request);
  } else if (request.url.match("tasks/[0-9]+/entries") && request.method === "POST") {
    await workEntryController.createWorkEntry(request);
  } else if (request.url.match("tasks/[0-9]+") && request.method === "POST") {
    await taskController.completeTask(request);
  } else {
    request.respond({ status: 404 });
  }
}
*/