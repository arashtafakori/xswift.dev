---
sidebar_position: 3
---

# Implementing the Domain

## Designing the subdomain

We want to have a backend service for a task management application. First of all, We try to prepare a big picture. We design the domain as a strategic design phase. This app includes 3 parts. Project, sprint, and task parts. According to the scale of the system (the application or the requirements), we can define each part as a bounded context. In this case, the scale of each part is small, so We consider that we have a bounded context equivalent to each part. Therefore. According to the picture below, we have three bounded contexts. Whole of this space is considered as the task management subdomain.

!\[\](/img/docs/0001-bounded-context.jpg)Figure 0001

## Describing the models

1.  **Project:**
    - **Definition:** In the context of your task management system, a Project is a high-level model. It could be a software development project, a marketing campaign, or any other organized effort.
    - **Aggregate Root:** The Project is modeled as an entity or entities (in this case it is modeled as one enity as aggregate root). It has attributes such as a unique identifier, a name.
    - **Behavior:** Projects can have behaviors like defining a project, changinging the name of the project, archiving the project, restoring the project.
2.  **Sprint:**
    - **Definition:** A Sprint is a time-boxed iteration within a Project where a specific set of tasks is planned and completed. It represents a short-term goal within the overall project.
    - **Aggregate Root:** Sprints is modeled as an entity or entities (in this case it is modeled as one enity as aggregate root). It has attributes such as a unique identifier, a name and start and end date.
    - **Association with Project:** Sprints are typically associated with a specific Project. They can include a set of tasks to be completed during that timespan.
    - **Behavior:** Sprints have behaviors like defining a sprint, changing the sprint name, changing the sprint time span, archiving the sprint, restoring the sprint.
3.  **Task:**
    - **Definition:** A Task represents a work that needs to be completed within a Project.
    - **Aggregate Root:** Sprints is modeled as an entity or entities (in this case it is modeled as one enity as aggregate root). It has attributes such as a unique identifier. It can change over time (e.g., status changes from 'not started' to 'in progress' to 'completed' or 'blocked').
    - **Attributes:** Tasks have attributes such as a description, due date, and status.
    - **Association with Project and Sprint:** Tasks are associated with a specific Project and might be part of a particular Sprint.
    - **Behavior:** Tasks may have behaviors like adding a task,changing the task status, editing the task, archiving the task, restoring the task.

**Note** that it has tried to design according to the DDD principles, but because of the simplicity feature of XSwift in some rare cases, the implementation and design will be different. Essentially, these cases do not violate the important DDD principles and patterns. For example, based on DDD principles, we should assign some behaviors like 'defining a project', 'archiving a project', and 'restoring a project' to an entity over the project entity that can belong to this subdomain or not. It can be such as an organization entity or a setting entity. Also, the 'defining a sprint' 'archiving a sprint', and 'restoring a spring' belong to the project entity. we've violated this rule in the current design because of to avoid confusion and complexity. In future versions, these cases will be solved simply according to the rules of DDD.

## Implementing the domain components

Open an IDE like VS Code or Visual Studio, It does not matter which IDE is used, in this tutorial we use Visual Studio. we create a black solution with the **sample-xswift-task-management**, and next, create a library project with the **Domain** name.

!\[\](/img/docs/0002-solution-explorer.jpg)Figure 0002

According to the picture above (Figure 0002), for the domain project library, we create a folder with the **ProjectAggregation** name and for that create the following folders: **Checks**, **Commands**, **Internal**, **Issues**, **Models**, and **Queries**. In addition, we add a class with the name **ProjectEntity** inside the ProhectAggregation. The naming is conventional and it is better to observe these conventions. In the following, We explain about them one by one.

First of all, we implement the Project entity.

```cs
using XSwift.Domain;
using Module.Domain.Properties;
using System.ComponentModel.DataAnnotations;
using Module.Domain.SprintAggregation;
using Module.Domain.TaskAggregation;

namespace Module.Domain.ProjectAggregation
{
    public class ProjectEntity : Entity<ProjectEntity, Guid>, IAggregateRoot
    {
        [MinLengthShouldBe(3)]
        [MaxLengthShouldBe(50)]
        [StringLength(50)]
        [Required(AllowEmptyStrings = false)]
        public string Name { get; protected set; } = string.Empty;

        public static ProjectEntity New() { return new ProjectEntity(); }

        public override ConditionProperty<ProjectEntity>? Uniqueness()
        {
            return new ConditionProperty<ProjectEntity>()
            {
                Condition = x => x.Name == Name,
                Description = Resource.UniquenessOfTheProject
            };
        }

        public ProjectEntity SetName(string value)
        {
            Name = value;

            return this;
        }

        #region These fields belong to EFCore DbContext configurations
        public ICollection<SprintEntity> Sprints { get; }
        public ICollection<TaskEntity> Tasks { get; }
        #endregion
    }
}
```

In the code above, **ProjectEntity** is inherited in the **Entity** abstract class, `Entity<ProjectEntity, Guid>`. Entity abstraction is located in **XSwift.Domain** namespace that belongs to XSwift. Therefore we add the [XSwift](https://www.nuget.org/packages/XSwift/) nuget to the project. The first generic type should be the ProjectEntity itself and the second generic type is the type of Id that here is Guid. In addition, it implements the **IAggregateRoot** interface too. In this version, it has no method signature or behavior. but in the next version, it will be able to limit the boundary and provide proxies.

Here, there is just one property for the project entity. It is the Name. it is decorated with four attributes. `[StringLength(50)]` and `[Required(AllowEmptyStrings = false)]` are the built-in ASP.Net Core data annotations, and `[MinLengthShouldBe(3)]` and `[MaxLengthShouldBe(50)]` are the built-in XSwift data annotations. they are set for some targets, It is used for configuring data fields in a database provider and in addition for validating properties value in a request when the properties of a request are bound to the entity properties. We will explain this later.

**MinLengthShouldBe**: is a built-in XSwift FieldValidationAttribute, to set the minimum of a string property of an entity.  
**MaxLengthShouldBe**: is a built-in XSwift FieldValidationAttribute, to set the maximum of a string property of an entity.  
**StringLength**: is a built-in Asp.Net Core ValidationAttribute, to set the length of a string property of an entity.  
**Required**: is a built-in Asp.Net Core ValidationAttribute, to indicate the property is required.
