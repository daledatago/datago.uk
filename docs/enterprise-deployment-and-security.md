# Enterprise deployment and security position

Status: proposed architecture for discussion. It is not a claim about features already implemented in the local demonstrations.

## Recommendation: portal first, agent optional

The enterprise product should be a governed service with its own identity, permissions, data controls and audit record. A web portal is the first user interface. Approved assistants, skills, APIs or MCP clients can call the same service later, but they must not become a second route around its controls.

```text
Business user or CITB author
          |
          +--> DataGo or buyer-branded portal
          |
          +--> Approved enterprise assistant, later and optional
                         |
                   Identity and policy
                         |
                 Governed application API
             /            |             \
     Workflow rules   Evidence record   Model gateway
             \            |             /
               Tenant-isolated data store
                         |
        Consented, anonymised aggregate insight
```

The model provider is a replaceable component behind the application. The security boundary sits in the DataGo service and the buyer's identity and data controls, not inside a prompt or a portable skill.

## Circular commercial-value service

The likely journey is:

1. A business user follows a link from Zero Waste Scotland's Business Information Hub or a programme invitation.
2. The user signs in and joins an organisation workspace.
3. The business enters a small set of commercial assumptions manually. Later, approved connectors can bring in selected data.
4. The service calculates scenarios, shows the evidence and uncertainty behind them, and records who owns each assumption.
5. The business decides whether to revise, pilot or prepare an investment case.
6. Zero Waste Scotland sees consented, anonymised and aggregated patterns for programme learning. It does not automatically receive every business's raw commercial data.

The current public prototype should stay anonymous and use synthetic data. Authentication and real business data belong in a controlled proof of concept after the data-sharing and research questions are agreed.

## CITB assessment-authoring service

The likely journey is different:

1. Authorised CITB staff sign in, ideally through Microsoft Entra ID if that fits CITB's target architecture.
2. An administrator selects approved, versioned source material and an assessment specification.
3. The service creates structured draft items through an approved model endpoint.
4. Automated checks flag missing fields, unsupported claims, duplicate content, readability issues and source gaps.
5. Named construction and assessment specialists review, return or approve each item.
6. Approved content is exported or integrated into CITB's chosen question-bank and delivery systems.

The initial proof of concept need not process candidate records or learner personal data. Keeping the first scope to source documents, draft questions and reviewer decisions reduces risk and makes the quality claim easier to test.

## What an agent or skill may do

An optional skill can describe the supported tasks and call the governed API. For example, it could ask the user for assumptions, request a scenario calculation and explain the returned evidence. It should contain no customer data, credentials, hidden buyer material or enforcement logic.

Claude, Codex, Microsoft Copilot or another approved client could provide a conversational interface. Each call must use delegated identity, pass through the same authorisation checks and create the same audit record as the portal. A buyer can then choose its preferred interface without changing the underlying controls.

Do not position a downloadable prompt pack or skill as the enterprise product. Prompts can guide behaviour, but they cannot enforce tenant separation, retention, access rights, deletion or auditability.

## Minimum enterprise controls

- **Organisation isolation:** every record belongs to a defined tenant and cannot be retrieved across tenants.
- **Identity and roles:** single sign-on where appropriate, multi-factor authentication and separate administrator, author, reviewer and read-only permissions.
- **Least privilege:** the model and connectors receive only the data needed for the current task.
- **Model gateway:** use buyer-approved models and regions, prevent provider training on customer inputs contractually, and retain the option to change provider.
- **Evidence boundaries:** distinguish source evidence, user assumptions, generated content and approved decisions.
- **Human approval:** high-impact content cannot move to an approved or published state without an authorised person.
- **Audit history:** record source version, model/configuration identifier, workflow version, edits, reviews, exports and access events.
- **Data lifecycle:** define collection, encryption, retention, export and deletion before accepting customer data.
- **Safe aggregation:** remove direct identifiers, apply minimum group thresholds and test re-identification risk before producing sponsor dashboards.
- **Application security:** secrets management, dependency and vulnerability management, monitoring, backups, incident response and independent testing appropriate to the delivery stage.
- **AI-specific controls:** test prompt injection, malicious files, unsupported citations, data leakage and unsafe tool use. Treat retrieved content as data, not instructions.

## Sensible delivery stages

### Demonstration

- Synthetic or public data only.
- No login and no external system connections.
- Shows the decision journey and the proposed controls.

### Controlled proof of concept

- One buyer-controlled environment or isolated tenant.
- Named users and basic role separation.
- Approved source set or limited business dataset.
- One approved model route.
- Full decision and review audit trail.
- No autonomous publication or cross-tenant aggregation.

### Enterprise pilot

- Buyer identity integration and formal access model.
- Agreed hosting, data location, retention and support model.
- Security testing and documented operational controls.
- Limited production integrations.
- Consented aggregation for sponsor insight where required.

### Scaled service

- Multiple organisations with tested tenant isolation.
- Configurable policies and model options.
- Managed connectors, service monitoring and support.
- Approved assistant and API access where there is user demand.

## Differentiation to test

DataGo should test the position that the valuable product is a governed decision service, not an agent tied to one model vendor. The portal and any assistant share the same evidence, permission and audit layer. This could give buyers the convenience of conversational tools without asking them to trust security rules embedded in a prompt.

Bridgly may eventually provide parts of the evidence, ownership, decision and handover layer. Treat that as a product hypothesis until the exact integration, permission and tenant-isolation behaviour is implemented and tested.
