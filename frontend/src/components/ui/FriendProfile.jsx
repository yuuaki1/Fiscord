import profile from '../../assets/profile.png'

export default function FriendProfile ({friendName}) {
    return  (
        <div className="flex items-center p-1 pl-5 my-5 mr-2 hover:bg-[#333333] group">
            <img src={profile} className="h-10 w-10 rounded-full cursor-pointer" alt="profile" />
            <div className="flex flex-col pl-4">
                <h4 className="flex items-center space-x-2 font-medium">
                    <span className="hover:underline text-white text-sm cursor-pointer">
                        {friendName}
                    </span>
                </h4>
            </div>
        </div>
    )
}