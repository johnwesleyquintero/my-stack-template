"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileUploader } from "@/components/file-uploader";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function UploadPage() {
  return (
    <>
      <Breadcrumbs items={[{ title: "Upload", href: "/upload" }]} />
      <Card>
        <CardHeader>
          <CardTitle>Upload CSV</CardTitle>
          <CardDescription>
            Upload your CSV file to map the data to the database.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FileUploader />
        </CardContent>
      </Card>
      <Alert>
        <AlertTitle>Important Information</AlertTitle>
        <AlertDescription>
          Make sure your CSV file is formatted correctly.
        </AlertDescription>
      </Alert>
    </>
  );
}
