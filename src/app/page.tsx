import LeftMenu from "@/app/components/LeftMenu";
import RightMenu from "@/app/components/RightMenu";
import AddPost from "@/app/components/AddPost";
import Feed from "@/app/components/Feed";

const Homepage = () => {
  return (
      <div className='flex gap-6 pt-6'>
        <div className='hidden xl:block w-[20%]'>
            <LeftMenu type="home"/>
        </div>
        <div className='w-ful lg:w-[70%] xl:w-[50%]'>
          <div className='flex flex-col gap-6'>

            <AddPost/>
            <Feed/>
          </div>
        </div>
        <div className='hidden lg:block w-[30%]'><RightMenu/></div>
      </div>
  )
}

export default Homepage