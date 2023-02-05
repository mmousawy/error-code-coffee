'use client';

export default function LogButton(props: any) {
  return (
    <button onClick={ () => console.log(props.data) }>Log</button>
  );
}
