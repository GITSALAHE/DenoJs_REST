import { MongoClient } from "https://deno.land/x/mongo@v0.22.0/mod.ts";
import { User } from "../types/types.ts";

const URI = "mongodb://127.0.0.1:27017";

// Mongo Connection Init
const client = new MongoClient();
try {
  await client.connect(URI);
  console.log("Database successfully connected");
} catch (err) {
  console.log(err);
}

const db = client.database("tsApi");
const users = db.collection<User>("users");



const getusers = async ({ response }: { response: any }) => {
  try {
    const allUsers = await users.find({}).toArray();
    console.log(allUsers);
    if (allUsers) {
      response.status = 200;
      response.body = {
        success: true,
        data: allUsers,
      };
    } else {
      response.status = 500;
      response.body = {
        success: false,
        msg: "Internal Server Error",
      };
    }
  } catch (err) {
    response.body = {
      success: false,
      msg: err.toString(),
    };
  }
};


const getOneUser = async ({
  params,
  response,
}: {
  params: { id: string };
  response: any;
}) => {
  const user = await users.findOne({ _id: params.id });

  if (user) {
    response.status = 200;
    response.body = {
      success: true,
      data: user,
    };
  } else {
    response.status = 404;
    response.body = {
      success: false,
      msg: "No user found",
    };
  }
};

const addUser = async ({
  request,
  response,
}: {
  request: any;
  response: any;
}) => {
  try {
    if (!request.hasBody) {
      response.status = 400;
      response.body = {
        success: false,
        msg: "No Data",
      };
    } else {
      const body = await request.body();
      const user = await body.value;
      await users.insertOne(user);
      response.status = 201;
      response.body = {
        success: true,
        data: user,
      };
    }
  } catch (err) {
    response.body = {
      success: false,
      msg: err.toString(),
    };
  }
};


const updateUser = async ({
  params,
  request,
  response,
}: {
  params: { id: string };
  request: any;
  response: any;
}) => {
  try {
    const body = await request.body();
    const inputUser = await body.value;
    await users.updateOne(
      { _id: params.id },
      { $set: { userName: inputUser.userName, email: inputUser.email } }
    );
    const updateduser = await users.findOne({ userID: params.id });
    response.status = 200;
    response.body = {
      success: true,
      data: updateduser,
    };
  } catch (err) {
    response.body = {
      success: false,
      msg: err.toString(),
    };
  }
};


const deleteuser = async ({
  params,
  response,
}: {
  params: { id: string };
  request: any;
  response: any;
}) => {
  try {
    await users.deleteOne({ userID: params.id });
    response.status = 201;
    response.body = {
      success: true,
      msg: "Product deleted",
    };
  } catch (err) {
    response.body = {
      success: false,
      msg: err.toString(),
    };
  }
};

export { getusers, getOneUser, addUser, updateUser, deleteuser };