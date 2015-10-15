# Building a View with Carbon 

## Introduction

Carbon provides modular, re-useable components written with [React](https://facebook.github.io/react/) Javascript library. Carbon components are platform agnostic and can be used with any backend - the only requirement is that data be passed in the JSON format. Carbon also utilizes the [Flux](https://facebook.github.io/flux/docs/overview.html) pattern to organize data flow within the view.

In this guide, we will walk through building a Carbon view within the context of a Rails application. We will indicate Rails/Ruby specific logic using the Rails logo:

## Building a Journals Page with Carbon 

* Before you begin, ensure you have followed the first time setup guide for [Carbon-factory](#https://github.com/Sage/carbon-factory/wiki/First-Time-System-Setup)

### 1) Creating a project

To begin, navigate to the directory that will house your project and run:
```
carbon prepare myproject
```
the directory will take the name you provide as *myproject*.