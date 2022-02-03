import * as React from 'react'
import NextLink, { LinkProps as NextLinkProps } from 'next/link'
import MuiLink, { LinkProps as MuiLinkProps } from '@mui/material/Link'
type NextComposedProps = Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  'href'
> &
  NextLinkProps

const NextComposed = React.forwardRef<HTMLAnchorElement, NextComposedProps>(
  (props, ref) => {
    const {
      as,
      href,
      replace,
      scroll,
      passHref,
      shallow,
      prefetch,
      locale,
      ...other
    } = props

    return (
      <NextLink
        href={href}
        prefetch={prefetch}
        as={as}
        replace={replace}
        scroll={scroll}
        shallow={shallow}
        passHref={passHref}
        locale={locale}
      >
        {/* eslint-disable-next-line jsx-a11y/anchor-has-content */}
        <a ref={ref} {...other} />
      </NextLink>
    )
  }
)
NextComposed.displayName = 'NextComposed'

interface LinkPropsBase {
  innerRef?: React.Ref<HTMLAnchorElement>
  naked?: boolean
}

export type LinkProps = LinkPropsBase &
  NextComposedProps &
  Omit<MuiLinkProps, 'href'>

function InnerLink(props: LinkProps) {
  const { href, innerRef, naked, ...other } = props
  if (naked) {
    return <NextComposed ref={innerRef} href={href} {...other} />
  }

  return (
    <MuiLink
      component={NextComposed}
      ref={innerRef}
      href={href as string}
      {...other}
      underline="hover"
    />
  )
}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => (
  <InnerLink {...props} innerRef={ref} />
))

Link.displayName = 'Link'
export default Link
