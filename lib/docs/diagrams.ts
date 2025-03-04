export const architectureDiagrams = {
  serverClient: `
graph TD;
    A["Server Components"]-->B["Data Fetching"]
    A-->C["Static UI Rendering"]
    A-->D["SEO Metadata"]
    E["Client Components"]-->F["Interactive UI"]
    E-->G["Form Handling"]
    E-->H["Client-side State"]
    I["Hybrid Approach"]-->A
    I-->E
`,

  dataFetching: `
graph TD;
    A["Server Components"]-->B["Direct DB Access"]
    A-->C["Server Actions"]
    D["Client Components"]-->E["Route Handlers"]
    D-->F["React Query for Client Cache"]
    C-->G["Form Submissions"]
    B-->H["Initial Page Data"]
`,

  authentication: `
graph TD;
    A["Middleware"]-->B["Route Protection"]
    A-->C["CSRF Protection"]
    D["Auth Provider"]-->E["User Session"]
    D-->F["Auth State"]
    G["Server Actions"]-->H["Protected Mutations"]
`,

  codeOrganization: `
graph TD;
    A["Feature-based Organization"]-->B["auth/"]
    A-->C["dashboard/"]
    A-->D["data-pipeline/"]
    E["Shared Components"]-->F["ui/"]
    E-->G["layout/"]
`,

  performance: `
graph TD;
    A["Server Components"]-->B["Reduced JS Bundle"]
    C["Image Optimization"]-->D["Next/Image with proper sizing"]
    E["Caching Strategy"]-->F["Static Generation where possible"]
    E-->G["Incremental Static Regeneration"]
    H["Code Splitting"]-->I["Dynamic Imports"]
`,

  dataPipeline: `
graph TD;
  A[Data Source] -->|Upload| B[File Processing]
  B -->|Validate| C{Validation}
  C -->|Pass| D[Field Mapping]
  C -->|Fail| E[Error Handling]
  E -->|Retry| B
  D -->|Transform| F[Data Processing]
  F -->|Store| G[Database]
  G -->|Export| H[Export Options]
  H -->|CSV| I[Local Download]
  H -->|Excel| J[Spreadsheet]
  H -->|Cloud| K[Google Drive]
`,
}

export const diagramTitles = {
  serverClient: 'Server/Client Component Architecture',
  dataFetching: 'Data Fetching Strategy',
  authentication: 'Authentication Flow',
  codeOrganization: 'Code Organization',
  performance: 'Performance Optimizations',
  dataPipeline: 'Data Pipeline Architecture',
}
