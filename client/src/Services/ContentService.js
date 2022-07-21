import { userAxios } from "./AuthService"

// GET REQUEST : '/public' get all articles
export const getPublicPosts = async (dispatch, didCancel) => {
  dispatch({ type: "GET_CONTENT_LOADING" })
  try {
    const response = await userAxios.get("/public")
    if (!didCancel) {
      dispatch({
        type: "GET_CONTENT_SUCCESS",
        payload: {
          articles: response.data.articles,
        },
      })
    }
  } catch (error) {
    if (!didCancel) {
      dispatch({
        type: "GET_CONTENT_FAILURE",
        payload: error.message || error.response.data,
      })
    }
  }
}

// GET REQUEST : '/dashboard/:username' get article by username
export const getUserPosts = async (username, dispatch, didCancel) => {
  dispatch({ type: "GET_CONTENT_LOADING" })
  try {
    const response = await userAxios.get(`/dashboard/${username}`)
    if (!didCancel) {
      dispatch({
        type: "GET_CONTENT_SUCCESS",
        payload: {
          articles: response.data.articles,
        },
      })
    }
  } catch (error) {
    if (!didCancel) {
      dispatch({
        type: "GET_CONTENT_FAILURE",
        payload: error.message || error.response.data,
      })
    }
  }
}

// POST REQUEST : '/dashboard/:username' add article
export const addPost = async (username, newitem, dispatch) => {
  dispatch({ type: "ADD_CONTENT_LOADING" })
  try {
    const response = await userAxios.post(`/dashboard/${username}`, newitem)
    dispatch({
      type: "ADD_CONTENT_SUCCESS",
      payload: {
        article: response.data.article,
        message: response.data.message,
      },
    })
  } catch (error) {
    dispatch({
      type: "ADD_CONTENT_FAILURE",
      payload: error.message || error.response.data,
    })
  }
}

// GET REQUEST : '/dashboard/:username/:id' to fetch a specific article
export const getPost = async (username, id, dispatch, didCancel) => {
  dispatch({ type: "GET_CONTENT_LOADING" })
  try {
    const response = await userAxios.get(`/dashboard/${username}/${id}`)
    console.log(response)
    console.log(response.data)
    console.log(response.data.article)
    if (!didCancel) {
      dispatch({
        type: "GET_CONTENT_SUCCESS",
        payload: {
          articles: response.data.article,
        },
      })
    }
  } catch (error) {
    if (!didCancel) {
      dispatch({
        type: "GET_CONTENT_FAILURE",
        payload: error.message || error.response.data,
      })
    }
  }
}

// PUT REQUEST : '/dashboard/:username/:id' update article
export const updatePost = async (username, id, newInput, dispatch) => {
  dispatch({
    type: "EDIT_CONTENT_LOADING",
    payload: id,
  })
  try {
    const response = await userAxios.put(
      `/dashboard/${username}/${id}`,
      newInput
    )
    dispatch({
      type: "EDIT_CONTENT_SUCCESS",
      payload: {
        article: response.data.article,
      },
    })
  } catch (error) {
    dispatch({
      type: "EDIT_CONTENT_FAILURE",
      payload: {
        id,
      },
    })
  }
}

// DElETE REQUEST : '/dashboard/:username/:id' delete article
export const deletePost = async (username, id, dispatch) => {
  dispatch({
    type: "DELETE_CONTENT_LOADING",
    payload: { id },
  })
  try {
    const response = await userAxios.delete(`/dashboard/${username}/${id}`)
    dispatch({
      type: "DELETE_CONTENT_SUCCESS",
      payload: {
        article: response.data,
      },
    })
  } catch (error) {
    dispatch({
      type: "DELETE_CONTENT_FAILURE",
      payload: error.message || error.response.data,
    })
  }
}
