import * as issueService from "../services/issueService.js";
import * as requestUtils from "../utils/requestUtils.js";

/* Part 3 */
const createIssue = async (request) => {
  const a = request
  const body = new TextDecoder().decode(await Deno.readAll(request.body));
  const params = new URLSearchParams(body);
  const description = params.get("description");
  const urlParts = a.url.split("/");

  await issueService.createIssue(urlParts[2], description);
  await requestUtils.redirectTo(request, `/projects/${urlParts[2]}`);
};

/* Part 4 */
const removeIssue = async (request) => {
  const urlParts = request.url.split("/");
  await issueService.removeIssue(urlParts[4]);
  await requestUtils.redirectTo(request, `/projects/${urlParts[2]}`);
};

export { createIssue, removeIssue };


/*
const createWorkEntry = async (request) => {
  const urlParts = request.url.split("/");
  await workEntryService.createWorkEntry(urlParts[2]);
  await requestUtils.redirectTo(request, `/tasks/${urlParts[2]}`);
};

const finishIssue = async (request) => {
  const urlParts = request.url.split("/");
  await issueService.finishIssue(urlParts[4]);
  await requestUtils.redirectTo(request, `/projects/${urlParts[2]}`);
};
/////


import * as issueService from "../services/issueService.js";
import * as requestUtils from "../utils/requestUtils.js";


const finishWorkEntry = async (request) => {
  const urlParts = request.url.split("/");
  await workEntryService.finishWorkEntry(urlParts[4]);
  await requestUtils.redirectTo(request, `/tasks/${urlParts[2]}`);
};

export { createWorkEntry, finishWorkEntry };
*/