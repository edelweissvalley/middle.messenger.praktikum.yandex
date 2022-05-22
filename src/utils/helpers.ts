export function submitHandler(e: Event): void {
  e.preventDefault();
  console.log(Object.fromEntries(new FormData(e.target as HTMLFormElement).entries()));
}
