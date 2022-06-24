import React, { useEffect } from 'react'
import { queryCache } from 'react-query'

import { Wrapper, Sidebar, Main } from '../components/styled'
import PostForm from '../components/PostForm'

import usePosts from '../hooks/usePosts'
import useInfinitePosts from '../hooks/useInfinitePosts'
import usePost, { fetchPost } from '../hooks/usePost'
import useCreatePost from '../hooks/useCreatePost'
import useSavePost from '../hooks/useSavePost'
import useDeletePost from '../hooks/useDeletePost'
import withRedux from "next-redux-wrapper";
import { useDispatch, useSelector } from 'react-redux'
import { getPostsStart } from '../store/reducers/postsSlice'
import { createPostStart } from '../store/reducers/createPostSlice'
import { STATUS_TYPE } from '../store/types'
import { getSinglePostStart } from '../store/reducers/singlePostSlice'
import { editPostStart } from '../store/reducers/editPostSlice'

function App() {
  const [activePostId, setActivePostId] = React.useState()

  return (
    <Wrapper>
      <Sidebar>
        <a href="#" onClick={() => setActivePostId()}>
          All Posts
        </a>
        <hr />
        <Stats setActivePostId={setActivePostId} />
      </Sidebar>
      <Main>
        {activePostId ? (
          <Post activePostId={activePostId} setActivePostId={setActivePostId} />
        ) : (
          <Posts setActivePostId={setActivePostId} />
        )}
      </Main>
    </Wrapper>
  )
}

function Posts({ setActivePostId }) {


  const dispatch = useDispatch()
  const {posts, loading, error} = useSelector((state) => state.posts)
  const { loading:createPostLoading} = useSelector((state) => state.createPost)
  const {post:singlePost} = useSelector((state) => state.singlePost)
  useEffect(() => {
      dispatch(getPostsStart())
  },[])
  const handleClickCreatePost = (values) => {
    dispatch(createPostStart(values))
  }
  return (
    <section>
      <div>
        <div>
          {loading === STATUS_TYPE.LOADING ? (
            <span>Loading...</span>
          ) : error ? (
            <span>Error: {error.message}</span>
          ) : (
            <>
              <h3>
                Posts{' '}
                {loading === STATUS_TYPE.LOADING  ? (
                  <small>Updating...</small>
                ) : null}
              </h3>
              <div>
                  <React.Fragment >
                    {posts?.map((post) => (
                      <div key={post.id}>
                        <a
                          href="#"
                          onClick={() => setActivePostId(post.id)}
                          onMouseEnter={() => {
                            if(singlePost?.id !== post?.id){
                            dispatch(getSinglePostStart(post?.id))
                            }
                            // if (!queryCache.getQuery(['post', post.id])) {
                            //   queryCache.prefetchQuery(
                            //     ['post', post.id],
                            //     fetchPost,
                            //     {
                            //       staleTime: 1000 * 60,
                            //     }
                            //   )
                            // }
                          }}
                        >
                          {post.title}
                        </a>
                      </div>
                    ))}
                  </React.Fragment>
              </div>
            </>
          )}
        </div>
      </div>
      <hr />
      <div>
        <h3>Create New Post</h3>
        <div>
          <PostForm
            onSubmit={handleClickCreatePost}
            submitText={
              createPostLoading === STATUS_TYPE.LOADING
                ? 'Saving...'
                : createPostLoading === STATUS_TYPE.ERROR
                ? 'Error!'
                : createPostLoading === STATUS_TYPE.SUCCESS
                ? 'Saved!'
                : 'Create Post'
            }
          />
        </div>
      </div>
    </section>
  )
}

function Post({ activePostId, setActivePostId }) {
  // const { status, data: post, error, isFetching } = usePost(activePostId)
  // const [savePost, { status: savePostStatus }] = useSavePost()
  const dispatch = useDispatch();
  const [deletePost, { status: deletePostStatus }] = useDeletePost()
  const {post, loading} = useSelector((state) => state.singlePost)
  const {loading:savePostStatus} = useSelector((state) => state.editPost)
  const onDelete = async () => {
    deletePost(post.id)
    setActivePostId()
  }

  return (
    <>
      {loading === STATUS_TYPE.LOADING ? (
        <span>Loading...</span>
      ) : loading === STATUS_TYPE.ERROR ? (
        <span>Error: {error.message}</span>
      ) : (
        <div>
          <h3>
            {post.title} {loading === STATUS_TYPE.LOADING  ? <small> Updating...</small> : null}
          </h3>
          <small>{post.id}</small>
          <div>
            <p>Post ID: {post.content}</p>
          </div>
          <hr />
          <PostForm
            initialValues={post}
            onSubmit={(values) => dispatch(editPostStart(values))}
            submitText={
              savePostStatus === STATUS_TYPE.LOADING
                ? 'Saving...'
                : savePostStatus === STATUS_TYPE.ERROR
                ? 'Error!'
                : savePostStatus === STATUS_TYPE.SUCCESS
                ? 'Saved!'
                : 'Update Post'
            }
          />

          <br />

          <button onClick={onDelete}>
            {deletePostStatus === 'loading' ? '...' : 'Delete Post'}
          </button>
        </div>
      )}
    </>
  )
}

function Stats({ setActivePostId }) {
  const {posts, loading, error} = useSelector((state) => state.posts)
  const {post, loading:singlePostLoading} = useSelector((state) => state.singlePost)

  const [postId, setPostId] = React.useState()
  return (
    <div>
      <div>
        Total Posts:{' '}
        {loading === STATUS_TYPE.LOADING
          ? '...'
          : loading === STATUS_TYPE.ERROR
          ? error?.message
          : posts?.length}
      </div>
      <hr />

    </div>
  )
}

export default App
