declare module "html2pdf.js" {
  interface Options {
    margin?: number | [number, number, number, number];
    filename?: string;
    image?: {
      type?: string;
      quality?: number;
    };
    html2canvas?: {
      scale?: number;
      [key: string]: any;
    };
    jsPDF?: {
      unit?: string;
      format?: string;
      orientation?: "portrait" | "landscape";
      [key: string]: any;
    };
    [key: string]: any;
  }

  interface Html2PdfInstance {
    set(options: Options): Html2PdfInstance;
    from(element: HTMLElement | string): Html2PdfInstance;
    save(): Promise<void>;
    toPdf(): Html2PdfInstance;
    output(type: string, options?: any): Promise<any>;
  }

  function html2pdf(): Html2PdfInstance;
  function html2pdf(
    element: HTMLElement | string,
    options?: Options
  ): Html2PdfInstance;

  export = html2pdf;
}
