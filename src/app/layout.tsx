// src/app/layout.tsx
import React from 'react';
import {AntdRegistry} from '@ant-design/nextjs-registry';
import StyledComponentsRegistry from './registry';
import '../styles/global.css'; //


export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        </head>
        <body>
        <StyledComponentsRegistry>
            <AntdRegistry>
                {children}
            </AntdRegistry>
        </StyledComponentsRegistry>
        </body>
        </html>
    );
}