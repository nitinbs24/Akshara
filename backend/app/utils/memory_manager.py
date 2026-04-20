import os

class MemoryManager:
    @staticmethod
    def cleanup_files(file_paths: list, logger=None):
        """
        Phase 4.14: Ephemeral Memory Manager
        Deletes temporary files after processing.
        """
        for path in file_paths:
            if path and os.path.exists(path):
                try:
                    os.remove(path)
                    if logger:
                        logger.info(f"Deleted ephemeral file: {path}")
                except Exception as del_err:
                    if logger:
                        logger.warning(f"Failed to delete ephemeral file {path}: {str(del_err)}")
