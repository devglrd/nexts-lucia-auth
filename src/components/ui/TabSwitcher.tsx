import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs"

type Props = {
  SignInTab: React.ReactNode,
  SignUpTab: React.ReactNode,
}

const TabSwitcher = ({SignInTab, SignUpTab}: Props) => {
  return (
    <Tabs className="min-w-[500px] min-h-[500px]" defaultValue={'sign-in'}>
      <TabsList className="flex ">
        <TabsTrigger className="w-full" value='sign-in'>Sign In</TabsTrigger>
        <TabsTrigger className="w-full" value='sign-up'>Sign Up</TabsTrigger>
      </TabsList>
      <TabsContent  value='sign-in'>{SignInTab}</TabsContent>
      <TabsContent  value='sign-up'>{SignUpTab}</TabsContent>
    </Tabs>
  )
}

export default TabSwitcher