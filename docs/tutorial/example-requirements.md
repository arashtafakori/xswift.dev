---
sidebar_position: 2
---

# Example requirements

Article **.** 16/25/2024 **.** [Arash Tafakori](https://github.com/arashtafakori)

As it was mentioned, the example is a simple task management application. For managing a project (like a software development project, a marketing campaign, or any other organized effort), We need to define a project. so that defines one sprint or more for the pro. A Sprint is an iteration within a Project. Each sprint has Strat and End date and can include some tasks. A Task represents a work that needs to be completed within a Project. A task belongs to a project and can just be in one sprint, but can not be in any sprint. each task has a status. At the same time, a task just has a status. It can be 'not started' to 'in progress' to 'completed' or 'blocked'. Users, those who have been assigned a task can change the status of the task. This application has some details. In the next, by Bdd practice, we will gather requirements and write all scenarios. after that, we will design the domain model by DDD practice.

Whether you have been experienced in BDD (Behavior-Driven Development) or not, because discovering and identifying the requirements, is easy, as well as modeling. By BDD we will prepare some scenarios to implement. if you are not familiar with BDD, the [BDD in Action](https://www.manning.com/books/bdd-in-action) book by John Ferguson Smart is a great resource to learn it.

We have the following features and scenarios to do. These scenarios have been prepared for The project feature. in the **How to do the acceptance tests** section, we will see all the user stories and scenarios.

```diff
Feature: Project Management

   ------------------------------------------

   User Story: As a user
               I want to restore a project
               So that I should be able to access the project again.

   Scenario: Given user defines a project
             When defining project
             Then should define it successfully

   Scenario: Given user defines a project
             And given a project with this name has already existed
             WhenDefiningProject
             then should be prevented from defining it

   ------------------------------------------

   User Story: As a user
               I want to change the name of a project
               So that I should be able to access the project with the new name

   Scenario: Given user changes the name of a project
             When changing the name
             Then should change it successfully

   Scenario: Given user changes the name of a project
             And given a project with the same new name has already existed
             When changing the name
             Then should be prevented from changing it

   ------------------------------------------

   User Story: As a user
               I want to archive a project
               So that I should not be able to access the project

   Scenario: Given User archives a project
             When archiving project
             Then should restore it successfully

   ------------------------------------------

   User Story: As a user
               I want to restore a project
               So that I should be able to access the project again

   Scenario: Given user restores an archived project
             When restoring project
             Then should restore it successfully

   ------------------------------------------
```

Some scenarios will be omitted in the real services that will be implemented by XSwift, which means that we do not write them and test them too. Because they are explicit, XSwift assesses them and If needed a suitable an **issue** will be thrown. For example, the scenario below:

```diff
   Scenario: Given user defines a project
             And given a project with this name has already existed
             WhenDefiningProject
             then should be prevented from defining it
```

In the next sections, we will explain more in action. As well as, about **Issues**.

XSwift is based on DDD approaches. So, In our domain model, there are no deletable commands. Instead of deleting an entity, an entity can be archived, as well as an archived entity can be restored too.

After we design and implement the domain model, and implement the application service, we implement the acceptance tests according to these scenarios. In this tutorial, we will not implement the application service and the acceptance test at the same time. But as good practice in TDD, It is recommended to implement both of them at the same time.

<!-- we implement the acceptance tests just by XUnit and also for asserting we use FluentAssetion NuGet. We do not use Specflow or other BDD frameworks or libraries. -->
