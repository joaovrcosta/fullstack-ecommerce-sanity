"use client";

import {
  ClerkLoaded,
  SignedIn,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import Link from "next/link";
import Form from "next/form";
import React from "react";
import { PackageIcon } from "@sanity/icons";
import { Button } from "./ui/button";
import useBasketStore from "@/stores/cart-store";
import { ShoppingCart } from "lucide-react";
import logo from "@/public/images/logo.svg";
import Image from "next/image";

function Header() {
  const { user } = useUser();

  const itemCount = useBasketStore((state) =>
    state.items.reduce((total, item) => total + item.quantity, 0)
  );

  return (
    <header className="flex flex-wrap justify-between items-center  w-full">
      <div className="bg-[#013196] w-full mx-auto">
        <div className="max-w-[1520px] mx-auto py-3">
          <ul className="flex text-white space-x-4 text-[13px]">
            <li>Yardbird</li>
            <li>Best Buy Outlet</li>
            <li>Best Buy Business</li>
          </ul>
        </div>
      </div>
      <div className="w-full flex flex-wrap justify-between items-center px-4 py-2 bg-[#0046be] mx-auto">
        <div className="max-w-[1520px] mx-auto flex w-full py-4">
          <Link
            href="/"
            className="text-2xl font-bold text-blue-500 hover:opacity-50 cursor-pointer mx-auto sm:mx-0"
          >
            <Image src={logo} alt="Logo" width={68} height={40} />
          </Link>
          {/* <CategorySelectorComponent /> */}
          <Form
            action="/search"
            className="w-full sm:w-auto sm:flex-1 sm:mx-4 mt-2 sm:mt-0"
          >
            <input
              type="text"
              name="query"
              placeholder="Search for products"
              className="bg-gray-100 text-gray-800 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 border w-full max-w-4xl"
            />
          </Form>
          <div className="flex items-center space-x-4 mt-4 sm:mt-0 flex-1 sm:flex-none">
            <Link href={"/basket"}>
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                <span className="sr-only">Cart</span>
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-black text-white text-xs flex items-center justify-center">
                  {itemCount}
                </span>
                <p>Cart</p>
              </Button>
            </Link>

            <ClerkLoaded>
              <SignedIn>
                <Link
                  href="/orders"
                  className="flex bg-blue-400 px-4 py-2 rounded w-full justify-center items-center"
                >
                  <div className="space-x-2 flex items-center text-white  text-semibold">
                    <PackageIcon className="h-6 w-6" />
                    <span>Orders</span>
                  </div>
                </Link>
              </SignedIn>

              {user ? (
                <div className="flex items-center space-x-2">
                  <UserButton />
                  <div className="hidden sm:block text-xs">
                    <p className="text-gray-400 text-nowrap">Welcome back</p>
                    <p className="text-gray-800">{user.fullName}!</p>
                  </div>
                </div>
              ) : (
                <SignInButton />
              )}

              {/* {user?.passkeys.length === 0 && (
              <Button
                onClick={createClerkPasskey}
                className="bg-white hover:bg-blue-700 hover:text-white animate-pulse text-blue-500 font-bold py-2 px-4 rounded border-blue-300 border"
              >
                Create passkey
              </Button>
            )} */}
            </ClerkLoaded>
          </div>
        </div>
      </div>
      <div className="bg-[#0046be] w-full mx-auto border-t border-[#4976e6]">
        <div className="max-w-[1520px] mx-auto py-3">
          <ul className="flex text-white space-x-4 text-[13px]">
            <li>Top Deals</li>
            <li>Deal of the Day</li>
            <li>Yes, Best Buy Sells That</li>
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Header;
