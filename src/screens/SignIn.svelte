<script>
  import { auth, googleProvider } from "../utils/firebase.js";
  import { authState } from "rxfire/auth";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  let user;
  const unsubscribe = authState(auth).subscribe((u) => (user = u));

  function loginWithGoogle() {
    auth.signInWithPopup(googleProvider).then((result) => {});
  }

  $: if (user) {
    dispatch("user", user);
  }
</script>

<div>
  <div
    class="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none
    lg:px-20 xl:px-24">
    <div class="mx-auto w-full max-w-sm">
      <div>
        <h2 class="mt-6 text-3xl leading-9 font-extrabold text-gray-900">
          Sign in to your account
        </h2>
        <p class="mt-2 text-sm leading-5 text-gray-600 max-w">Or</p>
      </div>

      <div class="mt-8">
        <div>
          <div>
            <p class="text-sm leading-5 font-medium text-gray-700">
              Sign in with
            </p>

            <div class="mt-1 grid grid-cols-3 gap-3">
              <div on:click={loginWithGoogle}>
                <span class="w-full inline-flex rounded-md shadow-sm">
                  <button
                    type="button"
                    class="w-full inline-flex justify-center py-2 px-4 border
                    border-gray-300 rounded-md bg-red-500 text-sm leading-5
                    font-medium text-gray-500 hover:text-gray-400
                    focus:outline-none focus:border-blue-300
                    focus:shadow-outline-blue transition duration-150
                    ease-in-out">
                    <i class="fab fa-google text-white p-4" />
                  </button>
                </span>
              </div>

              <div>
                <span class="w-full inline-flex rounded-md shadow-sm">
                  <button
                    type="button"
                    class="w-full inline-flex justify-center py-2 px-4 border
                    border-gray-300 rounded-md bg-blue-500 text-sm leading-5
                    font-medium text-gray-500 hover:text-gray-400
                    focus:outline-none focus:border-blue-300
                    focus:shadow-outline-blue transition duration-150
                    ease-in-out">
                    <i class="fab fa-twitter text-white p-4" />
                  </button>
                </span>
              </div>

              <div>
                <span class="w-full inline-flex rounded-md shadow-sm">
                  <button
                    type="button"
                    class="w-full inline-flex justify-center py-2 px-4 border
                    border-gray-300 rounded-md bg-gray-500 text-sm leading-5
                    font-medium text-gray-500 hover:text-gray-400
                    focus:outline-none focus:border-blue-300
                    focus:shadow-outline-blue transition duration-150
                    ease-in-out">
                    <i class="fab fa-github p-4 text-white" />
                  </button>
                </span>
              </div>
            </div>
          </div>

          <div class="mt-6 relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300" />
            </div>
            <div class="relative flex justify-center text-sm leading-5">
              <span class="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>
        </div>

        <div class="mt-6">
          <form action="#" method="POST">
            <div>
              <label
                for="email"
                class="block text-sm font-medium leading-5 text-gray-700">
                Email address
              </label>
              <div class="mt-1 rounded-md shadow-sm">
                <input
                  id="email"
                  type="email"
                  required
                  class="appearance-none block w-full px-3 py-2 border
                  border-gray-300 rounded-md placeholder-gray-400
                  focus:outline-none focus:shadow-outline-blue
                  focus:border-blue-300 transition duration-150 ease-in-out
                  sm:text-sm sm:leading-5" />
              </div>
            </div>

            <div class="mt-6">
              <label
                for="password"
                class="block text-sm font-medium leading-5 text-gray-700">
                Password
              </label>
              <div class="mt-1 rounded-md shadow-sm">
                <input
                  id="password"
                  type="password"
                  required
                  class="appearance-none block w-full px-3 py-2 border
                  border-gray-300 rounded-md placeholder-gray-400
                  focus:outline-none focus:shadow-outline-blue
                  focus:border-blue-300 transition duration-150 ease-in-out
                  sm:text-sm sm:leading-5" />
              </div>
            </div>

            <div class="mt-6 flex items-center justify-between">
              <div class="flex items-center">
                <input
                  id="remember_me"
                  type="checkbox"
                  class="form-checkbox h-4 w-4 text-indigo-600 transition
                  duration-150 ease-in-out" />
                <label
                  for="remember_me"
                  class="ml-2 block text-sm leading-5 text-gray-900">
                  Remember me
                </label>
              </div>

              <div class="text-sm leading-5">
                <a
                  href="/"
                  class="font-medium text-indigo-600 hover:text-indigo-500
                  focus:outline-none focus:underline transition ease-in-out
                  duration-150">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div class="mt-6">
              <span class="block w-full rounded-md shadow-sm">
                <button
                  type="submit"
                  class="w-full flex justify-center py-2 px-4 border
                  border-transparent text-sm font-medium rounded-md text-white
                  bg-indigo-600 hover:bg-indigo-500 focus:outline-none
                  focus:border-indigo-700 focus:shadow-outline-indigo
                  active:bg-indigo-700 transition duration-150 ease-in-out">
                  Sign in
                </button>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>
