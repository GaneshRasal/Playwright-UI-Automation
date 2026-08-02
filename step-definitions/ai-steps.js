import { Given, When, Then } from "@cucumber/cucumber";
import { Executor } from "../services/executor.js";
import { Assertion } from "../services/assertions.js";
import { AIPlanner } from "../services/ai-planner.js";
import { CacheService } from "../services/cache-service.js";

Given(
    "I open {string}",
    async function (url) {

        await this.page.goto(url);

        CacheService.invalidate(this.page);

    }
);

When(
    "AI executes",
    async function (docString) {

        const plan = await AIPlanner.createExecutionPlan(
            this.page,
            docString
        );

        const actions = plan.filter(
            step => !step.action.startsWith("assert")
        );

        await Executor.execute(
            this.page,
            actions
        );

    }
);

Then(
    "AI verifies",
    async function (docString) {

        const plan = await AIPlanner.createExecutionPlan(
            this.page,
            docString
        );

        const assertions = plan.filter(
            step => step.action.startsWith("assert")
        );

        await Assertion.execute(
            this.page,
            assertions
        );

    }
);