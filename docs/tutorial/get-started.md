---
sidebar_position: 1
---

# Get Started

We start the tutorial with an example. The example is a simple task management application that is inspired by Scrum board, and it has been implemented based on [XSwift version 1.3.2](https://www.nuget.org/packages/XSwift/).  

[Repository of the example on github](https://github.com/xswift-project/example-xswift-task-management/tree/based-on-efcore)

## Summary of the example requirements

For managing a project (like a software development project, a marketing campaign, or any other organized effort), We need to define a project. so that defines one sprint or more for the pro. A Sprint is an iteration within a Project. Each sprint has Strat and End date and can include some tasks. A Task represents a work that needs to be completed within a Project. A task belongs to a project and can just be in one sprint, but can not be in any sprint. each task has a status. At the same time, a task just has a status. It can be 'not started' to 'in progress' to 'completed' or 'blocked'. Users, those who have been assigned a task can change the status of the task. This application has some details. In the next, by Bdd practice, we will gather requirements and write all scenarios. after that, we will design the domain model by DDD practice.
