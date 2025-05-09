// import React from 'react';

// type LinkBaseProps = {
//   href: string;
//   onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
//   children: React.ReactNode;
//   // Add common props like target, rel, etc.
// } & React.AnchorHTMLAttributes<HTMLAnchorElement>;

// export const LinkBase = React.forwardRef<HTMLAnchorElement, LinkBaseProps>(
//   ({ href, onClick, children, ...rest }, ref) => {
//     return (
//       <a
//         href={href}
//         onClick={onClick}
//         ref={ref}
//         {...rest}
//       >
//         {children}
//       </a>
//     );
//   }
// );
// LinkBase.displayName = 'LinkBase';
