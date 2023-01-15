#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import {MainStack} from "../lib/main-stack";

const app = new cdk.App();

const domainOption = {
    domainName: "sample.binaryheap.com",
    domainNameAliasHostedZoneId: "Z2OJLYMUO9EFXC",
    domainNameAliasTarget: "d-iclyfrt7oc.execute-api.us-west-2.amazonaws.com",
}

new MainStack(app, `MainStack`, {}, domainOption);
