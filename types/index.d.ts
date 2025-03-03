import { Icons } from "@/components/icons";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

export type Icon = keyof typeof Icons;
