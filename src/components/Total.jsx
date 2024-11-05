const Total = ({ parts }) => {
    const totalExs = parts.reduce((acc, curr) => acc + curr.exercises, 0);

    return (
        <p><b>Number of exercises: { totalExs }</b></p>
    )
}

export default Total