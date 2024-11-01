export function navigateToSignin() {
  navigateTo({ path: '/auth/signin', query: { redirect: useRequestURL().href } })
}
