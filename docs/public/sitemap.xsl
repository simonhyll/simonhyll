<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="3.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes" />
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="en">
      <head>
        <title>Sitemap</title>
        <meta charset="UTF-8" />
        <meta http-equiv="x-ua-compatible" content="IE=edge,chrome=1" />
        <meta name="viewport"
          content="width=device-width,minimum-scale=1,initial-scale=1,shrink-to-fit=no" />
        <style type="text/css">
          body {
          font-family: Arial, sans-serif;
          background-color: #f0f0f0;
          }
          h1 {
          color: #003366;
          }
          .highlight {
          color: red;
          }
          /* Table Styles */
          table {
          width: 100%;
          border-collapse: collapse;
          margin: 20px 0;
          font-size: 16px;
          font-family: Arial, sans-serif;
          color: #333;
          }

          /* Header Row */
          th {
          background-color: #004080; /* Dark blue shade */
          color: #fff;
          text-align: left;
          padding: 12px;
          }

          /* Table Rows */
          td {
          padding: 12px;
          border-bottom: 1px solid #ddd;
          }

          /* Zebra Striping */
          tr:nth-child(even) {
          background-color: #f2f2f2;
          }

          /* Hover Effect */
          tr:hover {
          background-color: #e0f0ff;
          }

          /* Responsive Table */
          @media (max-width: 600px) {
          table {
          font-size: 14px;
          }

          th,
          td {
          padding: 8px;
          }
          }

        </style>
      </head>
      <body>
        <h1>Sitemap</h1>
        <table>
          <thead>
            <tr>
              <td>URL</td>
              <td>Changed</td>
            </tr>
          </thead>
          <tbody>
            <xsl:for-each select="/sitemap:urlset/sitemap:url">
              <tr>
                <td>
                  <a>
                    <xsl:attribute name="href">
                      <xsl:value-of select="sitemap:loc" />
                    </xsl:attribute>
                    <xsl:value-of select="sitemap:loc" />
                  </a>
                </td>
                <td>
                  <xsl:value-of
                    select="substring(sitemap:lastmod, 0, 11)" />
                </td>
              </tr>
            </xsl:for-each>
          </tbody>
        </table>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>