export default function CommunityDetails({params}: {params: {name: string}}) {
    return (
        <div>
            {params.name}
        </div>
    )
}